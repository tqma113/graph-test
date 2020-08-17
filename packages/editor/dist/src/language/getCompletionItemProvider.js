var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import server from './server';
var getKeyowrdSuggestions = function (range) {
    return [
        {
            label: 'declaration',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '<${1:identifier}> = {\n\t[${2:step}]\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: '<REFERENCE> = {\n\t[EXPRESSION]\n}',
            range: range
        },
        {
            label: 'start',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'start <${1:identifier}>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'start <REFERENCE>',
            range: range
        },
        {
            label: 'goto',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'goto <${1:identifier}>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'goto <REFERENCE>',
            range: range
        },
        {
            label: 'if',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'if [${1:condition}] -> {\n\t\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'if [EXPRESSION] -> {\n\t\n}',
            range: range
        },
        {
            label: 'ifelse',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'if [${1:condition}] -> {\n\t\n} else -> {\n\t\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'if [EXPRESSION] -> {\n\t\n} else -> {\n\t\n}',
            range: range
        },
        {
            label: 'switch',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'switch [${1:accept}] {\n\tcase [${2:expect}] -> {\n\t\n\t}\n\tdefault -> {\n\t\n\n\t}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'switch [EXPRESSION] {\n\tcase [EXPRESSION] -> {\n\t\n\t}\n\tdefault -> {\n\t\n\n\t}\n}',
            range: range
        },
        {
            label: 'import',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'import { <${1:identifier}> } from "${2:path}"',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'import { <REFERENCE> } from "PATH"',
            range: range
        },
        {
            label: 'export',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'export <${1:identifier}>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'export <REFERENCE>',
            range: range
        },
        {
            label: 'start',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'start',
            detail: 'Keyword start',
            range: range
        },
        {
            label: 'goto',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'goto',
            detail: 'Keyword goto',
            range: range
        },
        {
            label: 'if',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'if',
            detail: 'Keyword if',
            range: range
        },
        {
            label: 'else',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'else',
            detail: 'Keyword else',
            range: range
        },
        {
            label: 'switch',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'switch',
            detail: 'Keyword switch',
            range: range
        },
        {
            label: 'case',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'case',
            detail: 'Keyword case',
            range: range
        },
        {
            label: 'default',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'default',
            detail: 'Keyword default',
            range: range
        },
        {
            label: 'import',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'import',
            detail: 'Keyword import',
            range: range
        },
        {
            label: 'from',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'from',
            detail: 'Keyword from',
            range: range
        },
        {
            label: 'export',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'export',
            detail: 'Keyword export',
            range: range
        }
    ];
};
var getIdentifierSuggestions = function (range) {
    var suggestions = [];
    server.definations.forEach(function (defination) {
        suggestions.push({
            label: defination.identifier.word,
            kind: monaco.languages.CompletionItemKind.Function,
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
export default getCompletionItemProvider;
