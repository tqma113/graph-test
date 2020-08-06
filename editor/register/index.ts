import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import getKeyowrdSuggestions from './getKeyowrdSuggestions'

const keywords = ['start', 'goto', 'if', 'else', 'switch', 'case', 'default', 'import', 'export', 'from']

export default () => {
  monaco.languages.register({
    id: 'graph'
  })

  monaco.languages.setLanguageConfiguration('graph', {
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
      }
    ]
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