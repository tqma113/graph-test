import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const getKeyowrdSuggestions = (range: monaco.IRange): monaco.languages.CompletionItem[] => {
  return [
    {
      label: 'declaration',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: '<${1:identifier}> = {\n\t[${2:step}]\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '<REFERENCE> = {\n\t[EXPRESSION]\n}',
      range
    },
    {
      label: 'start',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'start <${1:identifier}>',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'start <REFERENCE>',
      range
    },
    {
      label: 'goto',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'goto <${1:identifier}>',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'goto <REFERENCE>',
      range
    },
    {
      label: 'if',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'if [${1:condition}] -> {\n\t\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'if [EXPRESSION] -> {\n\t\n}',
      range
    },
    {
      label: 'ifelse',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: 'if [${1:condition}] -> {\n\t\n} else -> {\n\t\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'if [EXPRESSION] -> {\n\t\n} else -> {\n\t\n}',
      range
    },
    {
      label: 'switch',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'switch [${1:accept}] {\n\tcase [${2:expect}] -> {\n\t\n\t}\n\tdefault -> {\n\t\n\n\t}\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'switch [EXPRESSION] {\n\tcase [EXPRESSION] -> {\n\t\n\t}\n\tdefault -> {\n\t\n\n\t}\n}',
      range
    },
    {
      label: 'import',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'import { <${1:identifier}> } from "${2:path}"',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'import { <REFERENCE> } from "PATH"',
      range
    },
    {
      label: 'export',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'export <${1:identifier}>',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'export <REFERENCE>',
      range
    },
    {
      label: 'start',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'start',
      detail: 'Keyword',
      range
    },
    {
      label: 'goto',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'goto',
      detail: 'Keyword',
      range
    },
    {
      label: 'if',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'if',
      detail: 'Keyword',
      range
    },
    {
      label: 'else',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'else',
      detail: 'Keyword',
      range
    },
    {
      label: 'switch',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'switch',
      detail: 'Keyword',
      range
    },
    {
      label: 'case',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'case',
      detail: 'Keyword',
      range
    },
    {
      label: 'default',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'default',
      detail: 'Keyword',
      range
    },
    {
      label: 'import',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'import',
      detail: 'Keyword',
      range
    },
    {
      label: 'from',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'from',
      detail: 'Keyword',
      range
    },
    {
      label: 'export',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'export',
      detail: 'Keyword',
      range
    }
  ]
}

export default getKeyowrdSuggestions