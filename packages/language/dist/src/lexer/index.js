import { SymbolChar, TokenKind, OperatorEnum } from './constants';
import { LexicalError } from './LexicalError';
import { isLetter, isValidContentChar, isNewLineChar, isWhitespace, isKeyword } from './util';
export * from './constants';
export * from './LexicalError';
export var createLexer = function (input) {
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
        return tokens[tokens.length - 1];
    };
    var next = function () {
        if (isEoP() && tokens.length > 0) {
            if (tokens[tokens.length - 1].kind === TokenKind.EOP) {
                return tokens[tokens.length - 1];
            }
            else {
                return {
                    kind: TokenKind.EOP,
                    word: null,
                    range: getRange()
                };
            }
        }
        var result = nextToken();
        while (true) {
            if (result.kind === 'error') {
                errors.push(result);
            }
            else {
                tokens.push(result);
                break;
            }
            result = nextToken();
        }
        return result;
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
        getPosition: getPosition,
        next: next,
        run: run
    };
};
