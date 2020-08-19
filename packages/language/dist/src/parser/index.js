/**
 * 递归下降分析法(recursive-descent parsing)
 *
 * 预测分析法(prdictive parsing)
 */
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
    var parse = function () {
        if (program) {
            return;
        }
        program = matchProgram();
    };
    var getNextToken = function () {
        while (true) {
            var tok = lexer.next();
            if (tok.kind !== TokenKind.Comment) {
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
     *
     * FIRST(program) = { EOP, FIRST(moduleStatement) }
     * FOLLOW(program) = { e }
     */
    var matchProgram = function () {
        var moduleStatemens = [];
        while (true) {
            var lookahead = predict();
            if (lookahead.kind !== TokenKind.EOP) {
                var moduleStatement = matchModuleStatement();
                if (moduleStatement === null) {
                    recoveryFromProgram();
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
            end: lexer.getPosition()
        });
    };
    /**
     * moduleStatement
     *  : inferenceDefinition
     *  | importStatement
     *  | exportStatement
     *  | startStatement
     *  ;
     *
     * FIRST(moduleStatement) = { Import, Export, Start, Identifier }
     * FOLLOW(moduleStatement) = { FIRST(moduleStatement), EOF }
     */
    var matchModuleStatement = function () {
        var lookahead = predict();
        if (lookahead.kind === TokenKind.Keyword) {
            switch (lookahead.word) {
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
            if (lookahead.kind === TokenKind.Identifier) {
                return matchInferenceDefinition();
            }
        }
        reportError("'" + KeywordEnum.Start + "', '" + KeywordEnum.Export + "', '" + KeywordEnum.Import + "', Identifier: <somethings>", lookahead);
        return null;
    };
    /**
     * inferenceDefinition
     *  : identifier '=' block
     *  ;
     *
     * FIRST(inferenceDefinition) = { identifier }
     * FOLLOW(inferenceDefinition) = { FOLLOW(moduleStatement), FOLLOW(module) }
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
     *
     * FIRST(block) = { OpenBrace }
     * FOLLOW(block) = { FOLLOW(inferenceDefinition), Else, FOLLOW(ifStatement), FOLLOW(caseClause), FOLLOW(defaultClause) }
     */
    var matchBlock = function () {
        if (requireOperator(OperatorEnum.OpenBrace)) {
            var start = token.range.start;
            var list = [];
            while (true) {
                var lookahead = predict();
                if (lookahead.kind === TokenKind.Operator && lookahead.word === OperatorEnum.CloseBrace) {
                    nextToken();
                    return createBlock(list, {
                        start: start,
                        end: lookahead.range.end
                    });
                }
                if (lookahead.kind === TokenKind.EOP) {
                    reportError(OperatorEnum.CloseBrace, lookahead);
                    return null;
                }
                var statement = matchStatement();
                if (statement === null) {
                    recoveryFromBlock();
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
     *
     * FIRST(importStatement) = { Import }
     * FOLLOW(importStatement) = { FOLLOW(moduleStatement) }
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
     *
     * FIRST(moduleItems) = { OpenBrace }
     * FOLLOW(moduleItems) = { From }
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
                            recoveryFromBlock();
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
     *
     * FIRST(exportStatement) = { Export }
     * FOLLOW(exportStatement) = { FOLLOW(moduleStatement) }
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
     *
     * FIRST(startStatement) = { Start }
     * FOLLOW(startStatement) = { FOLLOW(moduleStatement) }
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
     *
     * FIRST(module) = { Identifier }
     * FOLLOW(module) = { FOLLOW(startStatement), FOLLOW(exportStatement) }
     */
    var matchModule = function () {
        var lookahead = predict();
        if (lookahead.kind === TokenKind.Identifier) {
            var identifier = lookahead;
            var lookahead2 = predict(1);
            if (lookahead2.kind === TokenKind.Operator && lookahead2.word === OperatorEnum.Assign) {
                var definition = matchInferenceDefinition();
                if (definition) {
                    return createModule(identifier, definition, definition.range);
                }
                else {
                    return createModule(identifier, null, identifier.range);
                }
            }
            else {
                nextToken();
                return createModule(identifier, null, identifier.range);
            }
        }
        else {
            reportError('Identifier: <somethings>', lookahead);
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
     *
     * FIRST(statement) = { If, Switch, Goto, Action }
     * FOLLOW(statement) = { FIRST(statement), CloseBrace }
     */
    var matchStatement = function () {
        var lookahead = predict();
        if (lookahead.kind === TokenKind.Keyword) {
            switch (lookahead.word) {
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
            if (lookahead.kind === TokenKind.Action) {
                return matchStepStatement();
            }
        }
        reportError("'" + KeywordEnum.If + "', '" + KeywordEnum.Switch + "', '" + KeywordEnum.Goto + "', Action: [somethings]", lookahead);
        return null;
    };
    /**
     * stepStatement
     *  : Action
     *  ;
     *
     * FIRST(stepStatement) = { Action }
     * FOLLOW(stepStatement) = { FOLLOW(statement) }
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
     *
     * FRIST(ifStatement) = { If }
     * FOLLOW(ifStatement) = { FOLLOW(statement) }
     */
    var matchIfStatement = function () {
        if (requireKeyword(KeywordEnum.If)) {
            var start = token.range.start;
            if (requireAction()) {
                var expression = token;
                if (requireOperator(OperatorEnum.Result)) {
                    var ifBlock = matchBlock();
                    if (ifBlock) {
                        var lookahead = predict();
                        if (lookahead.kind === TokenKind.Keyword && lookahead.word === KeywordEnum.Else) {
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
     *
     * FRIST(switchStatement) = { Switch }
     * FOLLOW(switchStatement) = { FOLLOW(statement) }
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
     *
     * FIRST(switchBlock) = { OpenBrace }
     * FOLLOW(switchBlock) = { FOLLOW(switchStatement) }
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
     *
     * FIRST(caseClause) = { Case }
     * FOLLOW(caseClause) = { FIRST(caseClause), FIRST(defaultClause), CloseBrace }
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
     *
     * FIRST(defaultClause) = { Default }
     * FOLLOW(defaultClause) = { FIRST(caseClause), FIRST(defaultClause), CloseBrace }
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
     *
     * FRIST(gotoStatement) = { Goto }
     * FOLLOW(gotoStatement) = { FOLLOW(statement) }
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
    };
    var recoveryFromBlock = function () {
        while (true) {
            var lookahead = predict();
            if ((lookahead.kind === TokenKind.Keyword && lookahead.word === KeywordEnum.If)
                || (lookahead.kind === TokenKind.Keyword && lookahead.word === KeywordEnum.Switch)
                || (lookahead.kind === TokenKind.Keyword && lookahead.word === KeywordEnum.Goto)
                || (lookahead.kind === TokenKind.Action)
                || lookahead.kind === TokenKind.EOP) {
                break;
            }
            else {
                nextToken();
                if (lookahead.kind === TokenKind.Operator && lookahead.word === OperatorEnum.CloseBrace) {
                    break;
                }
            }
        }
    };
    var recoveryFromProgram = function () {
        while (true) {
            var lookahead = predict();
            if ((lookahead.kind === TokenKind.Keyword && lookahead.word === KeywordEnum.Start)
                || (lookahead.kind === TokenKind.Keyword && lookahead.word === KeywordEnum.Import)
                || (lookahead.kind === TokenKind.Keyword && lookahead.word === KeywordEnum.Export)
                || (lookahead.kind === TokenKind.Identifier)
                || lookahead.kind === TokenKind.EOP) {
                break;
            }
            else {
                nextToken();
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
            return lexer.lexicalErrors;
        },
        get syntaxErrors() {
            return errors;
        },
        parse: parse
    };
};
