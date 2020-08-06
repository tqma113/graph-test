import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const keywords = ['start', 'goto', 'if', 'else', 'switch', 'case', 'default', 'import', 'export', 'from']

const getKeyowrdSuggestions = (range: monaco.IRange) => {
  return [
    {
      label: 'declaration',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: '<${1:identifier}> = {\n\t[${2:step}]\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range
    },
    {
      label: 'start',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'start <${1:identifier}>',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range
    },
    {
      label: 'goto',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'goto <${1:identifier}>',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range
    },
    {
      label: 'if',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'if [${1:condition}] -> {\n\t\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range
    },
    {
      label: 'ifelse',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'if [${1:condition}] -> {\n\t\n} else -> {\n\t\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range
    },
    {
      label: 'switch',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'switch [${1:accept}] {\n\tcase [${2:expect}] -> {\n\t\n\t}\n\tdefault -> {\n\t\n\n\t}\n}',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range
    },
    {
      label: 'import',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'import { <${1:identifier}> } from "${2:path}"',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range
    },
    {
      label: 'export',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'export <${1:identifier}>',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range
    },
    {
      label: 'start',
      kind: monaco.languages.CompletionItemKind.Text,
      insertText: 'start',
      range
    },
    {
      label: 'goto',
      kind: monaco.languages.CompletionItemKind.Text,
      insertText: 'goto',
      range
    },
    {
      label: 'if',
      kind: monaco.languages.CompletionItemKind.Text,
      insertText: 'if',
      range
    },
    {
      label: 'else',
      kind: monaco.languages.CompletionItemKind.Text,
      insertText: 'else',
      range
    },
    {
      label: 'switch',
      kind: monaco.languages.CompletionItemKind.Text,
      insertText: 'switch',
      range
    },
    {
      label: 'case',
      kind: monaco.languages.CompletionItemKind.Text,
      insertText: 'case',
      range
    },
    {
      label: 'default',
      kind: monaco.languages.CompletionItemKind.Text,
      insertText: 'default',
      range
    },
    {
      label: 'import',
      kind: monaco.languages.CompletionItemKind.Text,
      insertText: 'import',
      range
    },
    {
      label: 'from',
      kind: monaco.languages.CompletionItemKind.Text,
      insertText: 'from',
      range
    },
    {
      label: 'export',
      kind: monaco.languages.CompletionItemKind.Text,
      insertText: 'export',
      range
    },
  ]
}

export default () => {
  monaco.languages.register({
    id: 'graph'
  })

  monaco.languages.setMonarchTokensProvider('graph', {
    tokenizer: {
      root: [
        [/->/, 'operator.arrow'],
        [/=/, 'operator.assign'],
        [/,/, 'operator.comma'],
        [/;/, 'operator.semicolon'],
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
        [/\[.*\]/, 'action'],
        [/<.*>/, 'identifier'],
        [/".*"/, 'path'],
        [/#.*/, 'comment'],
      ],
    }
  })

  monaco.languages.registerReferenceProvider('graph', {
    provideReferences(model, position, context, token) {
      console.log({
        model, position, context, token
      })
      return null
    }
  })

  monaco.languages.registerSignatureHelpProvider('graph', {
    signatureHelpTriggerCharacters: ['['],
    signatureHelpRetriggerCharacters: ['<'],
    provideSignatureHelp(model, position, token, context) {
      console.log({
        model, position, context, token
      })
      return null
    }
  })

  monaco.languages.registerHoverProvider('graph', {
    provideHover: function (model, position, token) {
      var word = model.getWordAtPosition(position);
      if (keywords.includes(word?.word || '')) {
        const contents = [
          {
            value: `**KEYWORD: ${word?.word}**`
          }
        ]
        return {
          range: new monaco.Range(position.lineNumber, word?.startColumn || 0, position.lineNumber, word?.endColumn || 0),
          contents
        }
      }
      return null
    }
  });

  monaco.languages.registerCompletionItemProvider('graph', {
    provideCompletionItems(model, position, context, token) {
      var word = model.getWordUntilPosition(position);
      var range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
      };

      var suggestions =[
        ...getKeyowrdSuggestions(range)
      ]
      
      return {
        suggestions
      }
    }
  })

  monaco.languages.registerFoldingRangeProvider("graph", {
    provideFoldingRanges: function(model, context, token) {
      let foldRanges: monaco.languages.FoldingRange[] = []
      let match: monaco.editor.FindMatch | null = null
      let position = new monaco.Position(0, 0)
      let stack: monaco.Position[] = []
      match = model.findNextMatch('[{|}]', position, true, true, null, true)
      
      while (match !== null) {
        let nextPosition = match.range.getEndPosition()
        if (nextPosition.isBefore(position)) {
          break
        } else {
          position = nextPosition
          if (match.matches && match.matches[0] === '{') {
            stack.push(position)
          } else {
            if (stack.length > 0) {
              let start = stack.pop()
              foldRanges.push({
                start: start?.lineNumber || 0,
                end: position.lineNumber
              })
            }
          }
          match = model.findNextMatch('[{|}]', position, true, true, null, true)
        }
      }

      return foldRanges;
    }
  })

  monaco.editor.defineTheme('graphTheme', {
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
  })
}