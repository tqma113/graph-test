import * as monaco from 'monaco-editor'
import server from './server'

const getKeyowrdSuggestions = (
  range: monaco.IRange
): monaco.languages.CompletionItem[] => {
  return [
    {
      label: 'declaration',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: '<${1:identifier}> = {\n\t[${2:step}]\n}',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '<REFERENCE> = {\n\t[EXPRESSION]\n}',
      range,
    },
    {
      label: 'start',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: 'start <${1:identifier}>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'start <REFERENCE>',
      range,
    },
    {
      label: 'goto',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: 'goto <${1:identifier}>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'goto <REFERENCE>',
      range,
    },
    {
      label: 'if',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: 'if [${1:condition}] -> {\n\t\n}',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'if [EXPRESSION] -> {\n\t\n}',
      range,
    },
    {
      label: 'ifelse',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: 'if [${1:condition}] -> {\n\t\n} else -> {\n\t\n}',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'if [EXPRESSION] -> {\n\t\n} else -> {\n\t\n}',
      range,
    },
    {
      label: 'switch',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText:
        'switch [${1:accept}] {\n\tcase [${2:expect}] -> {\n\t\n\t}\n\tdefault -> {\n\t\n\n\t}\n}',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail:
        'switch [EXPRESSION] {\n\tcase [EXPRESSION] -> {\n\t\n\t}\n\tdefault -> {\n\t\n\n\t}\n}',
      range,
    },
    {
      label: 'import',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: 'import { <${1:identifier}> } from "${2:path}"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'import { <REFERENCE> } from "PATH"',
      range,
    },
    {
      label: 'export',
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: 'export <${1:identifier}>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'export <REFERENCE>',
      range,
    },
    {
      label: 'start',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'start',
      detail: 'Keyword start',
      range,
    },
    {
      label: 'goto',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'goto',
      detail: 'Keyword goto',
      range,
    },
    {
      label: 'if',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'if',
      detail: 'Keyword if',
      range,
    },
    {
      label: 'else',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'else',
      detail: 'Keyword else',
      range,
    },
    {
      label: 'switch',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'switch',
      detail: 'Keyword switch',
      range,
    },
    {
      label: 'case',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'case',
      detail: 'Keyword case',
      range,
    },
    {
      label: 'default',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'default',
      detail: 'Keyword default',
      range,
    },
    {
      label: 'import',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'import',
      detail: 'Keyword import',
      range,
    },
    {
      label: 'from',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'from',
      detail: 'Keyword from',
      range,
    },
    {
      label: 'export',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'export',
      detail: 'Keyword export',
      range,
    },
  ]
}

const getIdentifierSuggestions = (
  range: monaco.IRange
): monaco.languages.CompletionItem[] => {
  let suggestions: monaco.languages.CompletionItem[] = []

  server.definations.forEach((defination) => {
    suggestions.push({
      label: defination.identifier.word,
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `<${defination.identifier.word}>`,
      detail: `Inference ${defination.identifier.word}`,
      range,
    })
  })

  return suggestions
}

const getCompletionItemProvider = (): monaco.languages.CompletionItemProvider => {
  return {
    provideCompletionItems(model, position, context, token) {
      var word = model.getWordUntilPosition(position)
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      }

      var suggestions = [
        // TODO:
        ...getKeyowrdSuggestions(range),
        ...getIdentifierSuggestions(range),
      ]

      return {
        suggestions,
      }
    },
  }
}

export default getCompletionItemProvider
