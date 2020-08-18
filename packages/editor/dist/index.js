import React, { useState, useRef, useLayoutEffect } from 'react';
import { editor, MarkerSeverity, languages, Range, KeyMod, KeyCode } from 'monaco-editor';
import { createParser, analysis } from 'graph-language';

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/**
 * language server
 * https://microsoft.github.io/language-server-protocol/
 */
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

var registerDiagnosticsAdapter = function () {
    var doValidate = function (model) {
        var markers = [];
        languageServer.lexicalErrors.forEach(function (error) {
            markers.push({
                severity: MarkerSeverity.Error,
                message: error.message,
                startLineNumber: error.position.line,
                startColumn: error.position.column,
                endLineNumber: error.position.line,
                endColumn: error.position.column
            });
        });
        languageServer.syntaxErrors.forEach(function (error) {
            markers.push({
                severity: MarkerSeverity.Error,
                message: error.message,
                startLineNumber: error.token.range.start.line,
                startColumn: error.token.range.start.column,
                endLineNumber: error.token.range.end.line,
                endColumn: error.token.range.end.column
            });
        });
        languageServer.semanticErrors.forEach(function (error) {
            markers.push({
                severity: MarkerSeverity.Error,
                message: error.message,
                startLineNumber: error.fragment.range.start.line,
                startColumn: error.fragment.range.start.column,
                endLineNumber: error.fragment.range.end.line,
                endColumn: error.fragment.range.end.column
            });
        });
        editor.setModelMarkers(model, MODE_ID, markers);
    };
    var disposables = [];
    var listener = Object.create(null);
    var onModelAdd = function (model) {
        var handle;
        var changeSubscription = model.onDidChangeContent(function () {
            clearTimeout(handle);
            handle = setTimeout(function () { return doValidate(model); }, 500);
        });
        listener[model.uri.toString()] = {
            dispose: function () {
                changeSubscription.dispose();
                clearTimeout(handle);
            }
        };
        doValidate(model);
    };
    var onModelRemoved = function (model) {
        editor.setModelMarkers(model, MODE_ID, []);
        var key = model.uri.toString();
        if (listener[key]) {
            listener[key].dispose();
            delete listener[key];
        }
    };
    disposables.push(editor.onDidCreateModel(onModelAdd));
    disposables.push(editor.onWillDisposeModel(onModelRemoved));
    disposables.push({
        dispose: function () {
            for (var _i = 0, _a = editor.getModels(); _i < _a.length; _i++) {
                var model = _a[_i];
                onModelRemoved(model);
            }
        }
    });
    editor.getModels().forEach(onModelAdd);
};

var getDocumentHighlightProvider = function () {
    return {
        provideDocumentHighlights: function (model, position, token) {
            // TODO
            return null;
        }
    };
};

var getKeyowrdSuggestions = function (range) {
    return [
        {
            label: 'declaration',
            kind: languages.CompletionItemKind.Snippet,
            insertText: '<${1:identifier}> = {\n\t[${2:step}]\n}',
            insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: '<REFERENCE> = {\n\t[EXPRESSION]\n}',
            range: range
        },
        {
            label: 'start',
            kind: languages.CompletionItemKind.Snippet,
            insertText: 'start <${1:identifier}>',
            insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'start <REFERENCE>',
            range: range
        },
        {
            label: 'goto',
            kind: languages.CompletionItemKind.Snippet,
            insertText: 'goto <${1:identifier}>',
            insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'goto <REFERENCE>',
            range: range
        },
        {
            label: 'if',
            kind: languages.CompletionItemKind.Snippet,
            insertText: 'if [${1:condition}] -> {\n\t\n}',
            insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'if [EXPRESSION] -> {\n\t\n}',
            range: range
        },
        {
            label: 'ifelse',
            kind: languages.CompletionItemKind.Snippet,
            insertText: 'if [${1:condition}] -> {\n\t\n} else -> {\n\t\n}',
            insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'if [EXPRESSION] -> {\n\t\n} else -> {\n\t\n}',
            range: range
        },
        {
            label: 'switch',
            kind: languages.CompletionItemKind.Snippet,
            insertText: 'switch [${1:accept}] {\n\tcase [${2:expect}] -> {\n\t\n\t}\n\tdefault -> {\n\t\n\n\t}\n}',
            insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'switch [EXPRESSION] {\n\tcase [EXPRESSION] -> {\n\t\n\t}\n\tdefault -> {\n\t\n\n\t}\n}',
            range: range
        },
        {
            label: 'import',
            kind: languages.CompletionItemKind.Snippet,
            insertText: 'import { <${1:identifier}> } from "${2:path}"',
            insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'import { <REFERENCE> } from "PATH"',
            range: range
        },
        {
            label: 'export',
            kind: languages.CompletionItemKind.Snippet,
            insertText: 'export <${1:identifier}>',
            insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'export <REFERENCE>',
            range: range
        },
        {
            label: 'start',
            kind: languages.CompletionItemKind.Keyword,
            insertText: 'start',
            detail: 'Keyword start',
            range: range
        },
        {
            label: 'goto',
            kind: languages.CompletionItemKind.Keyword,
            insertText: 'goto',
            detail: 'Keyword goto',
            range: range
        },
        {
            label: 'if',
            kind: languages.CompletionItemKind.Keyword,
            insertText: 'if',
            detail: 'Keyword if',
            range: range
        },
        {
            label: 'else',
            kind: languages.CompletionItemKind.Keyword,
            insertText: 'else',
            detail: 'Keyword else',
            range: range
        },
        {
            label: 'switch',
            kind: languages.CompletionItemKind.Keyword,
            insertText: 'switch',
            detail: 'Keyword switch',
            range: range
        },
        {
            label: 'case',
            kind: languages.CompletionItemKind.Keyword,
            insertText: 'case',
            detail: 'Keyword case',
            range: range
        },
        {
            label: 'default',
            kind: languages.CompletionItemKind.Keyword,
            insertText: 'default',
            detail: 'Keyword default',
            range: range
        },
        {
            label: 'import',
            kind: languages.CompletionItemKind.Keyword,
            insertText: 'import',
            detail: 'Keyword import',
            range: range
        },
        {
            label: 'from',
            kind: languages.CompletionItemKind.Keyword,
            insertText: 'from',
            detail: 'Keyword from',
            range: range
        },
        {
            label: 'export',
            kind: languages.CompletionItemKind.Keyword,
            insertText: 'export',
            detail: 'Keyword export',
            range: range
        }
    ];
};
var getIdentifierSuggestions = function (range) {
    var suggestions = [];
    languageServer.definations.forEach(function (defination) {
        suggestions.push({
            label: defination.identifier.word,
            kind: languages.CompletionItemKind.Function,
            insertText: "<" + defination.identifier.word + ">",
            detail: "Inference " + defination.identifier.word,
            range: range
        });
    });
    return suggestions;
};
var getCompletionItemProvider = function () {
    return {
        provideCompletionItems: function (model, position, context, token) {
            var word = model.getWordUntilPosition(position);
            var range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn
            };
            var suggestions = __spreadArrays(getKeyowrdSuggestions(range), getIdentifierSuggestions(range));
            return {
                suggestions: suggestions
            };
        },
    };
};

var getLanguageConfiguration = function () {
    return {
        comments: {
            lineComment: '#'
        },
        brackets: [
            ['{', '}'],
            ['[', ']'],
            ['<', '>'],
        ],
        folding: {
            offSide: true,
            markers: {
                start: /{/,
                end: /}/
            }
        },
        autoClosingPairs: [
            {
                open: '<',
                close: '>'
            },
            {
                open: '{',
                close: '}'
            },
            {
                open: '[',
                close: ']'
            },
            {
                open: '"',
                close: '"'
            }
        ],
        surroundingPairs: [
            {
                open: '<',
                close: '>'
            },
            {
                open: '{',
                close: '}'
            },
            {
                open: '[',
                close: ']'
            },
            {
                open: '"',
                close: '"'
            }
        ],
        wordPattern: /(\"([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\")|(<([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)>)|(\[([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\])|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g
    };
};

var getSignatureHelpProvider = function () {
    return {
        provideSignatureHelp: function (model, position, token, context) {
            // TODO:
            return null;
        }
    };
};

var keywords = ['start', 'goto', 'if', 'else', 'switch', 'case', 'default', 'import', 'export', 'from'];
var isKeyword = function (word) {
    return keywords.includes(word);
};

var isReference = function (word) {
    return /<([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)>/g.test(word);
};

var isAction = function (word) {
    return /\[([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\]/.test(word);
};

var WordType;
(function (WordType) {
    WordType[WordType["Action"] = 0] = "Action";
    WordType[WordType["Reference"] = 1] = "Reference";
    WordType[WordType["Keyword"] = 2] = "Keyword";
    WordType[WordType["Path"] = 3] = "Path";
    WordType[WordType["Invalid"] = 4] = "Invalid";
})(WordType || (WordType = {}));

var getDefinitionProvider = function () {
    return {
        provideDefinition: function (model, position, token) {
            var uri = model.uri;
            var word = model.getWordAtPosition(position);
            if (word && isReference(word.word)) {
                var name_1 = word.word.slice(1, word.word.length - 1);
                var defination = languageServer.definations.get(name_1);
                if (defination) {
                    return {
                        uri: uri,
                        range: {
                            startLineNumber: defination.definition.range.start.line,
                            startColumn: defination.definition.range.start.column,
                            endLineNumber: defination.definition.range.end.line,
                            endColumn: defination.definition.range.end.column
                        }
                    };
                }
            }
            return null;
        }
    };
};

var getReferenceProvider = function () {
    return {
        provideReferences: function (model, position, context, token) {
            var uri = model.uri;
            var word = model.getWordAtPosition(position);
            console.log({
                word: word,
                uri: uri,
                isReference: isReference((word === null || word === void 0 ? void 0 : word.word) || '')
            });
            if (word && isReference(word.word)) {
                var name_1 = word.word.slice(1, word.word.length - 1);
                var defination = languageServer.definations.get(name_1);
                if (defination) {
                    return [{
                            uri: uri,
                            range: {
                                startLineNumber: defination.definition.range.start.line,
                                startColumn: defination.definition.range.start.column,
                                endLineNumber: defination.definition.range.end.line,
                                endColumn: defination.definition.range.end.column
                            }
                        }];
                }
            }
            return null;
        }
    };
};

var getKeywordHover = function (keyword) {
    switch (keyword) {
        case 'goto':
            return [
                {
                    value: 'goto'
                },
                {
                    value: 'Enter another progress.'
                }
            ];
        case 'start':
            return [
                {
                    value: 'start'
                },
                {
                    value: 'Set the progress as a enterance.'
                }
            ];
        default:
            return [];
    }
};
var getHoverProvider = function () {
    return {
        provideHover: function (model, position, token) {
            var word = model.getWordAtPosition(position);
            if (word) {
                if (isKeyword(word.word)) {
                    var contents = getKeywordHover(word.word);
                    var range = new Range(position.lineNumber, word.startColumn || 0, position.lineNumber, (word === null || word === void 0 ? void 0 : word.endColumn) || 0);
                    return {
                        range: range,
                        contents: contents
                    };
                }
                else {
                    var line = model.getLineContent(position.lineNumber);
                    var start = Math.max(0, word.startColumn - 2);
                    var end = Math.min(line.length, word.endColumn + 2);
                    var content = line.slice(start, end);
                    if (isReference(content)) {
                        var contents = [
                            {
                                value: 'Reference'
                            },
                            {
                                value: word.word
                            }
                        ];
                        var range = new Range(position.lineNumber, word.startColumn || 0, position.lineNumber, (word === null || word === void 0 ? void 0 : word.endColumn) || 0);
                        return {
                            range: range,
                            contents: contents
                        };
                    }
                    else if (isAction(content)) {
                        var contents = [
                            {
                                value: 'Action'
                            },
                            {
                                value: word.word
                            }
                        ];
                        var range = new Range(position.lineNumber, word.startColumn || 0, position.lineNumber, (word === null || word === void 0 ? void 0 : word.endColumn) || 0);
                        return {
                            range: range,
                            contents: contents
                        };
                    }
                    else {
                        return null;
                    }
                }
            }
            else {
                return null;
            }
        }
    };
};

var getTokenProvider = function () {
    return {
        tokenizer: {
            root: [
                [/->/, 'operator.arrow'],
                [/=/, 'operator.assign'],
                [/,/, 'operator.comma'],
                [/\bstart\b/, 'keyword'],
                [/\bgoto\b/, 'keyword'],
                [/\bif\b/, 'keyword'],
                [/\belse\b/, 'keyword'],
                [/\bswitch\b/, 'keyword'],
                [/\bcase\b/, 'keyword'],
                [/\bdefault\b/, 'keyword'],
                [/\bimport\b/, 'keyword'],
                [/\bfrom\b/, 'keyword'],
                [/\bexport\b/, 'keyword'],
                [/{/, 'bracket.open'],
                [/}/, 'bracket.open'],
                [/\[([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]*)\]/, 'action'],
                [/<([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]*)>/, 'identifier'],
                [/\"([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]*)\"/, 'path'],
                [/#.*/, 'comment'],
            ]
        }
    };
};

var MODE_ID = 'graph';
var registerLanguage = (function () {
    languages.register({ id: MODE_ID });
    languages.setLanguageConfiguration(MODE_ID, getLanguageConfiguration());
    languages.setMonarchTokensProvider(MODE_ID, getTokenProvider());
    languages.registerCompletionItemProvider(MODE_ID, getCompletionItemProvider());
    languages.registerSignatureHelpProvider(MODE_ID, getSignatureHelpProvider());
    languages.registerHoverProvider(MODE_ID, getHoverProvider());
    languages.registerDocumentHighlightProvider(MODE_ID, getDocumentHighlightProvider());
    languages.registerReferenceProvider(MODE_ID, getReferenceProvider());
    languages.registerDefinitionProvider(MODE_ID, getDefinitionProvider());
    registerDiagnosticsAdapter();
});

var GRAPH_THEME = 'graph-dark';
var getTheme = function () {
    return {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: '', background: '#282c34' },
            { token: 'comment', foreground: '#7f848e' },
            { token: 'keyword', foreground: '#c678dd' },
            { token: 'path', foreground: '98c379' },
            { token: 'identifier', foreground: '61afef' },
            { token: 'action', foreground: 'e5c07b' },
            { token: 'operator.arrow', foreground: 'c678dd' },
            { token: 'operator.assign', foreground: '61afef' },
        ],
        colors: {}
    };
};
var initTheme = function () {
    editor.defineTheme(GRAPH_THEME, getTheme());
};

var createEditor = (function (container, value, options) {
    var model = editor.createModel(value, MODE_ID);
    var editor$1 = editor.create(container, __assign(__assign({}, options), { value: value, language: MODE_ID, theme: GRAPH_THEME, model: model }));
    editor$1.addAction({
        // An unique identifier of the contributed action.
        id: 'save',
        // A label of the action that will be presented to the user.
        label: 'Save',
        // An optional array of keybindings for the action.
        // Ctrl + S
        keybindings: [
            KeyMod.CtrlCmd | KeyCode.KEY_S,
        ],
        // A precondition for this action.
        precondition: undefined,
        // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
        keybindingContext: undefined,
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,
        // Method that will be executed when the action is triggered.
        // @param editor The editor instance is passed in as a convinience
        run: function (ed) {
            // TODO: do save operation
            console.log("i'm running => " + ed.getPosition());
        }
    });
    model.onDidChangeContent(function (e) {
        var lines = model.getLinesContent();
        // @ts-ignore
        var content = lines.join('\n');
        // TODO: Validation
    });
    return editor$1;
});

var fontSizes = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 36, 42, 48, 56];
var FontSizeSelect = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    return (React.createElement("span", null,
        React.createElement("span", null, "\u5B57\u53F7"),
        React.createElement("select", { value: value, onChange: onChange }, fontSizes.map(function (fontSize) {
            return (React.createElement("option", { key: fontSize, value: fontSize }, fontSize));
        }))));
};

var defaultStyle = {
    width: '800px',
    height: '900px',
};
var defaultOptions = {
    fontSize: 12
};
function MonacoEditor(_a) {
    var onChange = _a.onChange, style = _a.style, initialValue = _a.initialValue;
    var _b = useState(initialValue || '# start from here\n\n'), value = _b[0], setValue = _b[1];
    var _c = useState(defaultOptions), options = _c[0], setOptions = _c[1];
    var containerRef = useRef(null);
    var editor = useRef();
    var subscription = useRef();
    useLayoutEffect(function () {
        initMonaco();
        return function () {
            destoryMonaco();
        };
    }, [options]);
    useLayoutEffect(function () {
        languageServer.didChange(value);
    }, [value]);
    var initMonaco = function () {
        registerLanguage();
        initTheme();
        editor.current = createEditor(containerRef.current, value, options);
        var model = editor.current.getModel();
        if (model) {
            subscription.current = model.onDidChangeContent(function (e) {
                if (onChange) {
                    var lines = model.getLinesContent();
                    var content = lines.join('\n');
                    setValue(content);
                    onChange(content);
                }
            });
        }
    };
    var destoryMonaco = function () {
        if (editor.current) {
            editor.current.dispose();
            var model = editor.current.getModel();
            if (model) {
                model.dispose();
            }
        }
        if (subscription.current) {
            subscription.current.dispose();
        }
    };
    var handleFonSizeSelect = function (event) {
        var fontSize = Number(event.target.value);
        setOptions(__assign(__assign({}, options), { fontSize: fontSize }));
    };
    style = __assign(__assign({}, defaultStyle), style);
    return (React.createElement("div", null,
        React.createElement("span", null,
            React.createElement(FontSizeSelect, { value: options.fontSize, onChange: handleFonSizeSelect })),
        React.createElement("div", { ref: containerRef, style: style })));
}

export default MonacoEditor;
