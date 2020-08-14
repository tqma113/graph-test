var SymbolChar;
(function (SymbolChar) {
    SymbolChar["OpenBrace"] = "{";
    SymbolChar["CloseBrace"] = "}";
    SymbolChar["OpenBracket"] = "[";
    SymbolChar["CloseBracket"] = "]";
    SymbolChar["OpenAngleBracket"] = "<";
    SymbolChar["CloseAngleBracket"] = ">";
    SymbolChar["Assign"] = "=";
    SymbolChar["Result"] = "->";
    SymbolChar["Comma"] = ",";
    SymbolChar["Quote"] = "\"";
    SymbolChar["Well"] = "#";
})(SymbolChar || (SymbolChar = {}));
var OperatorEnum;
(function (OperatorEnum) {
    OperatorEnum["OpenBrace"] = "{";
    OperatorEnum["CloseBrace"] = "}";
    OperatorEnum["Assign"] = "=";
    OperatorEnum["Result"] = "->";
    OperatorEnum["Comma"] = ",";
})(OperatorEnum || (OperatorEnum = {}));
var KeywordEnum;
(function (KeywordEnum) {
    KeywordEnum["Start"] = "start";
    KeywordEnum["Goto"] = "goto";
    KeywordEnum["If"] = "if";
    KeywordEnum["Else"] = "else";
    KeywordEnum["Switch"] = "switch";
    KeywordEnum["Case"] = "case";
    KeywordEnum["Default"] = "default";
    KeywordEnum["Import"] = "import";
    KeywordEnum["From"] = "from";
    KeywordEnum["Export"] = "export";
})(KeywordEnum || (KeywordEnum = {}));
var TokenKind;
(function (TokenKind) {
    TokenKind["Comment"] = "comment";
    TokenKind["Operator"] = "operator";
    TokenKind["Keyword"] = "keyword";
    TokenKind["Identifier"] = "identifier";
    TokenKind["Action"] = "action";
    TokenKind["Path"] = "path";
    TokenKind["EOP"] = "eop";
})(TokenKind || (TokenKind = {}));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var LexicalError = /** @class */ (function (_super) {
    __extends(LexicalError, _super);
    function LexicalError(message, position) {
        var _this = _super.call(this, message) || this;
        _this.kind = 'error';
        _this.name = 'LexicalError';
        _this.message = message;
        _this.position = position;
        _this.stack = message + " at line: " + position.line + ", column: " + position.column;
        return _this;
    }
    return LexicalError;
}(Error));

var keywords = Object.values(KeywordEnum);
var isKeyword = function (word) {
    return keywords.includes(word);
};
var operators = Object.values(OperatorEnum);
var isValidContentChar = function (char) {
    return /[^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]/g.test(char);
};
var isWhitespace = function (char) {
    return /\s/.test(char) && char.length === 1;
};
var isNewLineChar = function (char) {
    return /[\r\n]+/.test(char);
};
var isLetter = function (char) {
    return /[a-zA-Z]/.test(char) && char.length === 1;
};

var createLexer = function (input) {
    var offset = 0;
    var forward = 0;
    var line = 1;
    var column = 1;
    var tokens = [];
    var errors = [];
    var run = function () {
        while (!isEoP()) {
            var result = nextToken();
            if (result.kind === 'error') {
                errors.push(result);
            }
            else {
                tokens.push(result);
            }
        }
    };
    var nextToken = function () {
        var result = consumeWhitespace();
        if (result) {
            return result;
        }
        var char = getCurrentChar();
        switch (char) {
            case SymbolChar.Well: {
                return matchComment();
            }
            case SymbolChar.OpenAngleBracket: {
                return matchIdentifier();
            }
            case SymbolChar.OpenBracket: {
                return matchAction();
            }
            case SymbolChar.Quote: {
                return matchPath();
            }
            default: {
                if (isLetter(char)) {
                    return matchKeyword();
                }
                else {
                    return matchOperator();
                }
            }
        }
    };
    var consumeWhitespace = function () {
        while (true) {
            var char = getCurrentChar();
            if (isEoP()) {
                return {
                    kind: TokenKind.EOP,
                    word: null,
                    range: getRange()
                };
            }
            if (isWhitespace(char)) {
                if (isNewLineChar(char)) {
                    nextLine();
                }
                nextChar();
                continue;
            }
            endWord();
            return null;
        }
    };
    var matchComment = function () {
        while (!isEoP() && !isNewLineChar(nextChar()))
            ;
        var word = getCurrentWord();
        var range = getRange();
        endWord();
        return {
            kind: TokenKind.Comment,
            word: word,
            range: range
        };
    };
    var matchIdentifier = function () {
        var char;
        while (true) {
            char = nextChar();
            if (char === SymbolChar.CloseAngleBracket) {
                nextChar();
                var word = getCurrentWord();
                var range = getRange();
                endWord();
                return {
                    kind: TokenKind.Identifier,
                    word: word,
                    range: range
                };
            }
            if (isEoP() || !isValidContentChar(char)) {
                var word = getCurrentWord();
                return new LexicalError("Identifier: " + word + " has not been closed", getPosition());
            }
        }
    };
    var matchAction = function () {
        var char;
        while (true) {
            char = nextChar();
            if (char === SymbolChar.CloseBracket) {
                nextChar();
                var word = getCurrentWord();
                var range = getRange();
                endWord();
                return {
                    kind: TokenKind.Action,
                    word: word,
                    range: range
                };
            }
            if (isEoP() || !isValidContentChar(char)) {
                var word = getCurrentWord();
                return new LexicalError("Action: " + word + " has not been closed", getPosition());
            }
        }
    };
    var matchPath = function () {
        var char;
        while (true) {
            char = nextChar();
            if (char === SymbolChar.Quote) {
                nextChar();
                var word = getCurrentWord();
                var range = getRange();
                endWord();
                return {
                    kind: TokenKind.Path,
                    word: word,
                    range: range
                };
            }
            if (isEoP() || !isValidContentChar(char)) {
                var word = getCurrentWord();
                return new LexicalError("Path: " + word + " has not been closed", getPosition());
            }
        }
    };
    var matchKeyword = function () {
        var char;
        while (true) {
            char = nextChar();
            if (isEoP() || !isLetter(char)) {
                var word = getCurrentWord();
                if (isKeyword(word)) {
                    var range = getRange();
                    endWord();
                    return {
                        kind: TokenKind.Keyword,
                        word: word,
                        range: range
                    };
                }
                else {
                    return new LexicalError("Unknown token: " + word, getPosition());
                }
            }
        }
    };
    var matchOperator = function () {
        var char = getCurrentChar();
        switch (char) {
            case OperatorEnum.OpenBrace: {
                nextChar();
                var range = getRange();
                endWord();
                return {
                    kind: TokenKind.Operator,
                    word: OperatorEnum.OpenBrace,
                    range: range
                };
            }
            case OperatorEnum.CloseBrace: {
                nextChar();
                var range = getRange();
                endWord();
                return {
                    kind: TokenKind.Operator,
                    word: OperatorEnum.CloseBrace,
                    range: range
                };
            }
            case OperatorEnum.Assign: {
                nextChar();
                var range = getRange();
                endWord();
                return {
                    kind: TokenKind.Operator,
                    word: OperatorEnum.Assign,
                    range: range
                };
            }
            case OperatorEnum.Result[0]: {
                var nc = nextChar();
                if (nc === OperatorEnum.Result[1]) {
                    nextChar();
                    var range = getRange();
                    endWord();
                    return {
                        kind: TokenKind.Operator,
                        word: OperatorEnum.Result,
                        range: range
                    };
                }
                else {
                    nextChar();
                    var word = getCurrentWord();
                    return new LexicalError("Unknown token: " + word, getPosition());
                }
            }
            case OperatorEnum.Comma: {
                nextChar();
                var range = getRange();
                endWord();
                return {
                    kind: TokenKind.Operator,
                    word: OperatorEnum.Comma,
                    range: range
                };
            }
            default: {
                nextChar();
                return new LexicalError("Unknown token: " + char, getPosition());
            }
        }
    };
    var nextChar = function () {
        forward++;
        column++;
        return input[forward];
    };
    var nextLine = function () {
        line++;
        column = 1;
    };
    var endWord = function () {
        offset = forward;
        forward = offset;
    };
    var getCurrentWord = function () {
        return input.slice(offset, forward);
    };
    var getCurrentChar = function () {
        return input[forward] || '';
    };
    var getPosition = function () {
        return {
            line: line,
            column: column
        };
    };
    var getRange = function () {
        var length = forward - offset;
        return {
            start: {
                line: line,
                column: column - length - 1
            },
            end: {
                line: line,
                column: column - 1
            }
        };
    };
    var isEoP = function () {
        return forward >= input.length;
    };
    return {
        get tokens() {
            return tokens;
        },
        get errors() {
            return errors;
        },
        nextToken: nextToken,
        run: run
    };
};

var SyntaxError = /** @class */ (function (_super) {
    __extends(SyntaxError, _super);
    function SyntaxError(message, token) {
        var _this = _super.call(this, message) || this;
        _this.kind = 'error';
        _this.name = 'SyntaxError';
        _this.message = message;
        _this.token = token;
        _this.stack = message + " at line: " + token.range.start.line + ", column: " + token.range.start.column;
        return _this;
    }
    return SyntaxError;
}(Error));

var FragmentKind;
(function (FragmentKind) {
    FragmentKind["Program"] = "Program";
    FragmentKind["InferenceDeclaration"] = "InferenceDeclaration";
    FragmentKind["ImportStatement"] = "ImportStatement";
    FragmentKind["ModuleItems"] = "ModuleItems";
    FragmentKind["Module"] = "Module";
    FragmentKind["ExportStatement"] = "ExportStatement";
    FragmentKind["StartStatement"] = "StartStatement";
    FragmentKind["Block"] = "Block";
    FragmentKind["StepStatement"] = "StepStatement";
    FragmentKind["IfStatement"] = "IfStatement";
    FragmentKind["SwitchStatement"] = "SwitchStatement";
    FragmentKind["SwitchBlock"] = "SwitchBlock";
    FragmentKind["CaseClause"] = "CaseClause";
    FragmentKind["DefaultClause"] = "DefaultClause";
    FragmentKind["GotoStatement"] = "GotoStatement";
})(FragmentKind || (FragmentKind = {}));
var createProgram = function (moduleStatemens, range) {
    return {
        kind: FragmentKind.Program,
        moduleStatemens: moduleStatemens,
        range: range
    };
};
var createInferenceDeclaration = function (identifier, block, range) {
    return {
        kind: FragmentKind.InferenceDeclaration,
        identifier: identifier,
        block: block,
        range: range
    };
};
var createImportStatement = function (moduleItems, path, range) {
    return {
        kind: FragmentKind.ImportStatement,
        moduleItems: moduleItems,
        path: path,
        range: range
    };
};
var createModuleItems = function (identifiers, range) {
    return {
        kind: FragmentKind.ModuleItems,
        identifiers: identifiers,
        range: range
    };
};
var createModule = function (identifier, declaration, range) {
    return {
        kind: FragmentKind.Module,
        identifier: identifier,
        declaration: declaration,
        range: range
    };
};
var createExportStatement = function (module, range) {
    return {
        kind: FragmentKind.ExportStatement,
        module: module,
        range: range
    };
};
var createStartStatement = function (module, range) {
    return {
        kind: FragmentKind.StartStatement,
        module: module,
        range: range
    };
};
var createBlock = function (list, range) {
    return {
        kind: FragmentKind.Block,
        list: list,
        range: range
    };
};
var createStepStatement = function (expression, range) {
    return {
        kind: FragmentKind.StepStatement,
        expression: expression,
        range: range
    };
};
var createIfStatement = function (expression, ifBlock, elseBlock, range) {
    return {
        kind: FragmentKind.IfStatement,
        expression: expression,
        ifBlock: ifBlock,
        elseBlock: elseBlock,
        range: range
    };
};
var createSwitchStatement = function (expression, switchBlock, range) {
    return {
        kind: FragmentKind.SwitchStatement,
        expression: expression,
        switchBlock: switchBlock,
        range: range
    };
};
var createSwitchBlock = function (caseClauses, defaultClause, range) {
    return {
        kind: FragmentKind.SwitchBlock,
        caseClauses: caseClauses,
        defaultClause: defaultClause,
        range: range
    };
};
var createCaseClause = function (expression, block, range) {
    return {
        kind: FragmentKind.CaseClause,
        expression: expression,
        block: block,
        range: range
    };
};
var createDefaultClause = function (block, range) {
    return {
        kind: FragmentKind.DefaultClause,
        block: block,
        range: range
    };
};
var createGotoStatement = function (identifier, range) {
    return {
        kind: FragmentKind.GotoStatement,
        identifier: identifier,
        range: range
    };
};

var createParser = function (input) {
    var lexer = createLexer(input);
    var token = null;
    var cache = [];
    var program = null;
    var errors = [];
    var parse = function () {
        if (program) {
            return;
        }
        program = matchProgram();
    };
    var getNextToken = function () {
        while (true) {
            var tok = lexer.nextToken();
            if (tok.kind !== 'error' && tok.kind !== TokenKind.Comment) {
                if (tok.word === '{') ;
                if (tok.word === '}') ;
                return tok;
            }
        }
    };
    var nextToken = function () {
        if (cache.length > 0) {
            token = cache.shift();
        }
        else {
            token = getNextToken();
        }
        return token;
    };
    var predict = function (key) {
        if (key === void 0) { key = 0; }
        if (token && token.kind === TokenKind.EOP) {
            return token;
        }
        if (cache.length > key) {
            return cache[key];
        }
        else {
            var token_1 = getNextToken();
            cache.push(token_1);
            return token_1;
        }
    };
    /**
     * program
     *  : moduleStatement* EOP
     *  ;
     */
    var matchProgram = function () {
        var moduleStatemens = [];
        while (true) {
            var token_2 = predict();
            if (token_2.kind !== TokenKind.EOP) {
                var moduleStatement = matchModuleStatement();
                if (moduleStatement === null) {
                    recovery();
                }
                else {
                    moduleStatemens.push(moduleStatement);
                }
            }
            else {
                break;
            }
        }
        return createProgram(moduleStatemens, {
            start: {
                line: 1,
                column: 1
            },
            end: token.range.end
        });
    };
    /**
     * moduleStatement
     *  : inferenceDeclaration
     *  | importStatement
     *  | exportStatement
     *  | startStatement
     *  ;
     */
    var matchModuleStatement = function () {
        var token = predict();
        if (token.kind === TokenKind.Keyword) {
            switch (token.word) {
                case KeywordEnum.Import: {
                    return matchImportStatement();
                }
                case KeywordEnum.Export: {
                    return matchExportStatement();
                }
                case KeywordEnum.Start: {
                    return matchStartStatement();
                }
            }
        }
        else {
            if (token.kind === TokenKind.Identifier) {
                return matchInferenceDeclaration();
            }
        }
        reportError("'" + KeywordEnum.Start + "', '" + KeywordEnum.Export + "', '" + KeywordEnum.Import + "', Identifier: <somethings>", token);
        return null;
    };
    /**
     * inferenceDeclaration
     *  : identifier '=' block
     *  ;
     */
    var matchInferenceDeclaration = function () {
        if (requireIdentifier()) {
            var identifier = token;
            if (requireOperator(OperatorEnum.Assign)) {
                var block = matchBlock();
                if (block === null) {
                    return null;
                }
                else {
                    return createInferenceDeclaration(identifier, block, {
                        start: identifier.range.start,
                        end: block.range.end
                    });
                }
            }
            else {
                reportError(OperatorEnum.Assign, token);
                return null;
            }
        }
        else {
            reportError('Identifier: <somethings>', token);
            return null;
        }
    };
    /**
     * block
     *  : '{' statement*'}'
     *  ;
     */
    var matchBlock = function () {
        if (requireOperator(OperatorEnum.OpenBrace)) {
            var start = token.range.start;
            var list = [];
            while (true) {
                var token_3 = predict();
                if (token_3.kind === TokenKind.Operator && token_3.word === OperatorEnum.CloseBrace) {
                    nextToken();
                    return createBlock(list, {
                        start: start,
                        end: token_3.range.end
                    });
                }
                var statement = matchStatement();
                if (statement === null) {
                    recovery();
                }
                else {
                    list.push(statement);
                }
            }
        }
        else {
            reportError(OperatorEnum.OpenBrace, token);
            return null;
        }
    };
    /**
     * importStatement
     *  : Import moduleItems From path
     *  ;
     */
    var matchImportStatement = function () {
        if (requireKeyword(KeywordEnum.Import)) {
            var start = token.range.start;
            var moduleItems = matchModuleItems();
            if (moduleItems) {
                if (requireKeyword(KeywordEnum.From)) {
                    if (requirePath()) {
                        var path = token;
                        return createImportStatement(moduleItems, path, {
                            start: start,
                            end: token.range.end
                        });
                    }
                    else {
                        reportError('Path: "somethings"', token);
                        return null;
                    }
                }
                else {
                    reportError(KeywordEnum.From, token);
                    return null;
                }
            }
            else {
                return null;
            }
        }
        else {
            reportError(KeywordEnum.Import, token);
            return null;
        }
    };
    /**
     * moduleItems
     *  : '{' (identifier ',')* (identifier ','?)? '}'
     *  ;
     */
    var matchModuleItems = function () {
        var identifiers = [];
        if (requireOperator(OperatorEnum.OpenBrace)) {
            var start = token.range.start;
            if (requireIdentifier()) {
                identifiers.push(token);
                while (true) {
                    if (requireOperator(OperatorEnum.Comma)) {
                        if (requireIdentifier()) {
                            identifiers.push(token);
                        }
                        else if (token.kind === TokenKind.Operator && token.word === OperatorEnum.CloseBrace) {
                            return createModuleItems(identifiers, {
                                start: start,
                                end: token.range.end
                            });
                        }
                        else {
                            recovery();
                            return createModuleItems(identifiers, {
                                start: start,
                                end: token.range.end
                            });
                        }
                    }
                    else if (token.kind === TokenKind.Operator && token.word === OperatorEnum.CloseBrace) {
                        return createModuleItems(identifiers, {
                            start: start,
                            end: token.range.end
                        });
                    }
                    else {
                        reportError('Identifier: <somethings>', token);
                        return null;
                    }
                }
            }
            else {
                reportError('Identifier: <somethings>', token);
                return null;
            }
        }
        else {
            reportError(OperatorEnum.OpenBrace, token);
            return null;
        }
    };
    /**
     * exportStatement
     *  : Export module
     *  ;
     */
    var matchExportStatement = function () {
        if (requireKeyword(KeywordEnum.Export)) {
            var start = token.range.start;
            var module_1 = matchModule();
            if (module_1) {
                return createExportStatement(module_1, {
                    start: start,
                    end: module_1.range.end
                });
            }
            else {
                return null;
            }
        }
        else {
            reportError(KeywordEnum.Export, token);
            return null;
        }
    };
    /**
     * startStatement
     *  : Start module
     *  ;
     */
    var matchStartStatement = function () {
        if (requireKeyword(KeywordEnum.Start)) {
            var start = token.range.start;
            var module_2 = matchModule();
            if (module_2) {
                return createStartStatement(module_2, {
                    start: start,
                    end: module_2.range.end
                });
            }
            else {
                return null;
            }
        }
        else {
            reportError(KeywordEnum.Start, token);
            return null;
        }
    };
    /**
     * module
     * : identifier
     * | inferenceDeclaration
     * ;
     */
    var matchModule = function () {
        var nt = predict();
        if (nt.kind === TokenKind.Identifier) {
            var identifier = nt;
            var nt2 = predict(1);
            if (nt2.kind === TokenKind.Operator && nt2.word === OperatorEnum.Assign) {
                var declaration = matchInferenceDeclaration();
                if (declaration) {
                    return createModule(identifier, declaration, declaration.range);
                }
                else {
                    return createModule(identifier, null, identifier.range);
                }
            }
            else {
                return createModule(identifier, null, identifier.range);
            }
        }
        else {
            reportError('Identifier: <somethings>', token);
            return null;
        }
    };
    /**
     * statement
     *  : stepStatement
     *  | ifStatement
     *  | switchStatement
     *  | gotoStatement
     *  ;
     */
    var matchStatement = function () {
        var token = predict();
        if (token.kind === TokenKind.Keyword) {
            switch (token.word) {
                case KeywordEnum.If: {
                    return matchIfStatement();
                }
                case KeywordEnum.Switch: {
                    return matchSwitchStatement();
                }
                case KeywordEnum.Goto: {
                    return matchGotoStatement();
                }
            }
        }
        else {
            if (token.kind === TokenKind.Action) {
                return matchStepStatement();
            }
        }
        reportError("'" + KeywordEnum.If + "', '" + KeywordEnum.Switch + "', '" + KeywordEnum.Goto + "', Action: [somethings]", token);
        return null;
    };
    /**
     * stepStatement
     *  : Action
     *  ;
     */
    var matchStepStatement = function () {
        nextToken();
        var expression = token;
        return createStepStatement(expression, token.range);
    };
    /**
     * ifStatement
     *  : If expression '->' block (Else block)?
     *  ;
     */
    var matchIfStatement = function () {
        if (requireKeyword(KeywordEnum.If)) {
            var start = token.range.start;
            if (requireAction()) {
                var expression = token;
                if (requireOperator(OperatorEnum.Result)) {
                    var ifBlock = matchBlock();
                    if (ifBlock) {
                        var nt = predict();
                        if (nt.kind === TokenKind.Keyword && nt.word === KeywordEnum.Else) {
                            nextToken();
                            var elseBlock = matchBlock();
                            if (elseBlock) {
                                return createIfStatement(expression, ifBlock, elseBlock, {
                                    start: start,
                                    end: elseBlock.range.end
                                });
                            }
                            else {
                                return createIfStatement(expression, ifBlock, null, {
                                    start: start,
                                    end: ifBlock.range.end
                                });
                            }
                        }
                        else {
                            return createIfStatement(expression, ifBlock, null, {
                                start: start,
                                end: ifBlock.range.end
                            });
                        }
                    }
                    else {
                        return null;
                    }
                }
                else {
                    reportError(OperatorEnum.Result, token);
                    return null;
                }
            }
            else {
                reportError('Action: [somethings]', token);
                return null;
            }
        }
        else {
            reportError(KeywordEnum.If, token);
            return null;
        }
    };
    /**
     * switchStatement
     *  : Switch expression switchBlock
     *  ;
     */
    var matchSwitchStatement = function () {
        if (requireKeyword(KeywordEnum.Switch)) {
            var start = token.range.start;
            if (requireAction()) {
                var expression = token;
                var switchBlock = matchSwitchBlock();
                if (switchBlock) {
                    return createSwitchStatement(expression, switchBlock, {
                        start: start,
                        end: switchBlock.range.end
                    });
                }
                else {
                    return null;
                }
            }
            else {
                reportError('Action: [somethings]', token);
                return null;
            }
        }
        else {
            reportError(KeywordEnum.Switch, token);
            return null;
        }
    };
    /**
     * switchBlock
     *  : '{' caseClause* (defaultClause caseClause*)? '}'
     *  ;
     */
    var matchSwitchBlock = function () {
        if (requireOperator(OperatorEnum.OpenBrace)) {
            var start = token.range.start;
            var caseClauses = [];
            var defaultClause = null;
            while (true) {
                nextToken();
                if (token.kind === TokenKind.Operator && token.word === OperatorEnum.CloseBrace) {
                    return createSwitchBlock(caseClauses, defaultClause, {
                        start: start,
                        end: token.range.end
                    });
                }
                else if (token.kind === TokenKind.Keyword && token.word === KeywordEnum.Case) {
                    var caseClause = matchCaseClause();
                    if (caseClause) {
                        caseClauses.push(caseClause);
                    }
                }
                else if (token.kind === TokenKind.Keyword && token.word === KeywordEnum.Default) {
                    var dc = matchDefaultClause();
                    if (dc) {
                        defaultClause = dc;
                    }
                }
                else {
                    reportError("'" + KeywordEnum.Case + "', '" + KeywordEnum.Default + "', '" + OperatorEnum.CloseBrace + "'", token);
                    return null;
                }
            }
        }
        else {
            reportError(OperatorEnum.OpenBrace, token);
            return null;
        }
    };
    /**
     * caseClause
     *  : Case expression '->' block?
     *  ;
     */
    var matchCaseClause = function () {
        var start = token.range.start;
        if (requireAction()) {
            var expression = token;
            if (requireOperator(OperatorEnum.Result)) {
                var block = matchBlock();
                if (block) {
                    return createCaseClause(expression, block, {
                        start: start,
                        end: block.range.end
                    });
                }
                else {
                    return null;
                }
            }
            else {
                reportError(OperatorEnum.Result, token);
                return null;
            }
        }
        else {
            reportError('Action: [somethings]', token);
            return null;
        }
    };
    /**
     * defaultClause
     *  : Default '->' block?
     *  ;
     */
    var matchDefaultClause = function () {
        var start = token.range.start;
        if (requireOperator(OperatorEnum.Result)) {
            var block = matchBlock();
            if (block) {
                return createDefaultClause(block, {
                    start: start,
                    end: block.range.end
                });
            }
            else {
                return null;
            }
        }
        else {
            reportError(OperatorEnum.Result, token);
            return null;
        }
    };
    /**
     * gotoStatement
     *  : Goto identifier
     *  ;
     */
    var matchGotoStatement = function () {
        if (requireKeyword(KeywordEnum.Goto)) {
            var start = token.range.start;
            if (requireIdentifier()) {
                var identifier = token;
                return createGotoStatement(identifier, {
                    start: start,
                    end: token.range.end
                });
            }
            else {
                reportError("Identifier: <somethings>", token);
                return null;
            }
        }
        else {
            reportError(KeywordEnum.Goto, token);
            return null;
        }
    };
    var requirePath = function () {
        nextToken();
        return token.kind === TokenKind.Path;
    };
    var requireAction = function () {
        nextToken();
        return token.kind === TokenKind.Action;
    };
    var requireIdentifier = function () {
        nextToken();
        return token.kind === TokenKind.Identifier;
    };
    var requireKeyword = function (keyword) {
        nextToken();
        return token.kind === TokenKind.Keyword && token.word === keyword;
    };
    var requireOperator = function (operator) {
        nextToken();
        return token.kind === TokenKind.Operator && token.word === operator;
    };
    var reportError = function (expect, token) {
        errors.push(new SyntaxError("Expect { " + expect + " }, accept '" + token.word + "'", token));
        console.log(errors[errors.length - 1]);
    };
    var recovery = function () {
        while (true) {
            nextToken();
            console.trace(token);
            if ((token.kind === TokenKind.Operator && token.word === '}') || token.kind === TokenKind.EOP) {
                break;
            }
        }
    };
    return {
        get program() {
            return program;
        },
        get tokens() {
            return lexer.tokens;
        },
        get lexcialErrors() {
            return lexer.errors;
        },
        get syntaxErrors() {
            return errors;
        },
        parse: parse
    };
};

var SemanticError = /** @class */ (function (_super) {
    __extends(SemanticError, _super);
    function SemanticError(message, fragment) {
        var _this = _super.call(this, message) || this;
        _this.kind = 'error';
        _this.name = 'SemanticError';
        _this.message = message;
        _this.fragment = fragment;
        _this.range = fragment.range;
        _this.stack = message + " at line: " + fragment.range.start.line + ", column: " + fragment.range.start.column;
        return _this;
    }
    return SemanticError;
}(Error));

var checkSemantic = function (program) {
    var inferenceTable = new Map();
    var errors = [];
    var record = function () {
        program.moduleStatemens.forEach(function (moduleStatement) {
            switch (moduleStatement.kind) {
                case FragmentKind.ImportStatement: {
                    recordImport(moduleStatement);
                    break;
                }
                case FragmentKind.InferenceDeclaration: {
                    recordDeclaration(moduleStatement);
                    break;
                }
                case FragmentKind.StartStatement: {
                    recordStart(moduleStatement);
                    break;
                }
            }
        });
    };
    var recordImport = function (importStatement) {
        importStatement.moduleItems.identifiers.forEach(function (identifier) {
            addInference({
                identifier: identifier,
                declaration: importStatement
            });
        });
    };
    var recordDeclaration = function (inferenceDeclaration) {
        addInference({
            identifier: inferenceDeclaration.identifier,
            declaration: inferenceDeclaration
        });
    };
    var recordStart = function (startStatement) {
        if (startStatement.module.declaration) {
            addInference({
                identifier: startStatement.module.identifier,
                declaration: startStatement.module.declaration
            });
        }
    };
    var addInference = function (inference) {
        var name = getContent(inference.identifier.word);
        if (inferenceTable.has(name)) {
            reportError("Module " + name + " has been declared twice", inference.declaration);
        }
        else {
            inferenceTable.set(name, inference);
        }
    };
    var checkProgram = function (program) {
        program.moduleStatemens.forEach(checkModuleStatement);
    };
    var checkModuleStatement = function (moduleStatement) {
        switch (moduleStatement.kind) {
            case FragmentKind.ImportStatement: {
                checkImportStatement(moduleStatement);
                break;
            }
            case FragmentKind.ExportStatement: {
                checkExportStatement(moduleStatement);
                break;
            }
            case FragmentKind.StartStatement: {
                checkStartStatement(moduleStatement);
                break;
            }
            case FragmentKind.InferenceDeclaration: {
                checkInferenceDeclaration(moduleStatement);
                break;
            }
        }
    };
    var checkInferenceDeclaration = function (inferenceDeclaration) {
        checkBlock(inferenceDeclaration.block);
    };
    var checkImportStatement = function (importStatement) {
        checkModuleItems(importStatement.moduleItems);
    };
    var checkModuleItems = function (moduleItems) {
    };
    var checkModule = function (module) {
        var name = getContent(module.identifier.word);
        if (!inferenceTable.has(name)) {
            reportError("Module " + name + " has not been declared", module);
        }
        if (module.declaration) {
            checkInferenceDeclaration(module.declaration);
        }
    };
    var checkExportStatement = function (exportStatement) {
        checkModule(exportStatement.module);
    };
    var checkStartStatement = function (startStatement) {
        checkModule(startStatement.module);
    };
    var checkBlock = function (block) {
        block.list.forEach(checkStatement);
    };
    var checkStatement = function (statement) {
        switch (statement.kind) {
            case FragmentKind.StepStatement: {
                break;
            }
            case FragmentKind.IfStatement: {
                checkIfStatement(statement);
                break;
            }
            case FragmentKind.SwitchStatement: {
                checkSwitchStatement(statement);
                break;
            }
            case FragmentKind.GotoStatement: {
                checkGotoStatement(statement);
                break;
            }
        }
    };
    var checkIfStatement = function (ifStatement) {
        checkBlock(ifStatement.ifBlock);
        if (ifStatement.elseBlock) {
            checkBlock(ifStatement.elseBlock);
        }
    };
    var checkSwitchStatement = function (switchStatement) {
        checkSwitchBlock(switchStatement.switchBlock);
    };
    var checkSwitchBlock = function (switchBlock) {
        switchBlock.caseClauses.forEach(checkCaseClause);
        if (switchBlock.defaultClause) {
            checkDefaultClause(switchBlock.defaultClause);
        }
    };
    var checkCaseClause = function (caseClause) {
        checkBlock(caseClause.block);
    };
    var checkDefaultClause = function (defaultClause) {
        checkBlock(defaultClause.block);
    };
    var checkGotoStatement = function (gotoStatement) {
        var name = getContent(gotoStatement.identifier.word);
        if (!inferenceTable.has(name)) {
            reportError("Module " + name + " has not been declared", gotoStatement);
        }
    };
    var reportError = function (message, fragment) {
        errors.push(new SemanticError(message, fragment));
    };
    record();
    checkProgram(program);
    return errors;
};
var getContent = function (word) {
    return word.slice(1, word.length - 1);
};

export { checkSemantic, createParser };
