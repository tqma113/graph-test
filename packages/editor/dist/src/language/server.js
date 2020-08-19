/**
 * language server
 * https://microsoft.github.io/language-server-protocol/
 */
// @ts-nocheck
import { createParser, analysis } from 'graph-language';
var createServer = function (input) {
    if (input === void 0) { input = ''; }
    var definations = new Map();
    var lexicalErrors = [];
    var syntaxErrors = [];
    var semanticErrors = [];
    var didChange = function (_input) {
        input = _input;
        analyze();
    };
    var analyze = function () {
        var parser = createParser(input);
        parser.parse();
        lexicalErrors = parser.lexcialErrors;
        syntaxErrors = parser.syntaxErrors;
        if (parser.program) {
            var _a = analysis(parser.program), _semanticErrors = _a.semanticErrors, table = _a.table;
            semanticErrors = _semanticErrors;
            definations = table;
        }
        else {
            semanticErrors = [];
            definations = new Map();
        }
    };
    analyze();
    return {
        didChange: didChange,
        get input() {
            return input;
        },
        get definations() {
            return definations;
        },
        get lexicalErrors() {
            return lexicalErrors;
        },
        get syntaxErrors() {
            return syntaxErrors;
        },
        get semanticErrors() {
            return semanticErrors;
        },
    };
};
var languageServer = createServer();
export default languageServer;
