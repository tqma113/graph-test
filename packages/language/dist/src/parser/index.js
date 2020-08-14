import { createLexer } from '../lexer';
import { TokenKind, KeywordEnum, OperatorEnum } from '../lexer/constants';
import { SyntaxError } from './SyntaxError';
import { createProgram, createInferenceDefinition, createImportStatement, createExportStatement, createStartStatement, createStepStatement, createIfStatement, createSwitchStatement, createGotoStatement, createBlock, createSwitchBlock, createCaseClause, createDefaultClause, createModuleItems, createModule } from './ast';
export * from './ast';
export * from './SyntaxError';
export var createParser = function (input) {
    var lexer = createLexer(input);
    var token = null;
    var cache = [];
    var program = null;
    var errors = [];
    var blockStack = ['global'];
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
                if (tok.word === '{') {
                    blockStack.push('local');
                }
                if (tok.word === '}') {
                    blockStack.pop();
                }
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
     *  : inferenceDefinition
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
                return matchInferenceDefinition();
            }
        }
        reportError("'" + KeywordEnum.Start + "', '" + KeywordEnum.Export + "', '" + KeywordEnum.Import + "', Identifier: <somethings>", token);
        return null;
    };
    /**
     * inferenceDefinition
     *  : identifier '=' block
     *  ;
     */
    var matchInferenceDefinition = function () {
        if (requireIdentifier()) {
            var identifier = token;
            if (requireOperator(OperatorEnum.Assign)) {
                var block = matchBlock();
                if (block === null) {
                    return null;
                }
                else {
                    return createInferenceDefinition(identifier, block, {
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
     * | inferenceDefinition
     * ;
     */
    var matchModule = function () {
        var nt = predict();
        if (nt.kind === TokenKind.Identifier) {
            var identifier = nt;
            var nt2 = predict(1);
            if (nt2.kind === TokenKind.Operator && nt2.word === OperatorEnum.Assign) {
                var definition = matchInferenceDefinition();
                if (definition) {
                    return createModule(identifier, definition, definition.range);
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
