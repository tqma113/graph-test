import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import getKeyowrdSuggestions from './getKeyowrdSuggestions'
import getKeywordHover from './getKeywordHover'
import getTokenizer from './getTokenizer'
import getAutoClosingPairs from './getAutoClosingPairs'
import getThemeRules from './getThemeRules'
import { isKeyword, isReference, isAction } from '../utils'

export default () => {
  monaco.languages.register({
    id: 'graph'
  })

  monaco.languages.setLanguageConfiguration('graph', {
    autoClosingPairs: getAutoClosingPairs()
  })

  monaco.languages.setMonarchTokensProvider('graph', {
    tokenizer: getTokenizer()
  })

  monaco.languages.registerReferenceProvider('graph', {
    provideReferences(model, position, context, token) {
      // model.uri
      // context.includeDeclaration
      console.log({
        model, position, context, token
      })
      return null
    }
  })

  // monaco.languages.registerSignatureHelpProvider('graph', {
  //   signatureHelpTriggerCharacters: ['['],
  //   signatureHelpRetriggerCharacters: ['<'],
  //   provideSignatureHelp(model, position, token, context) {
  //     console.log({
  //       model, position, context, token
  //     })
  //     return null
  //   }
  // })

  monaco.languages.registerHoverProvider('graph', {
    provideHover: function (model, position, token) {
      let word = model.getWordAtPosition(position);
      if (word) {
        if (isKeyword(word.word)) {
          const contents = getKeywordHover(word.word)
          const range = new monaco.Range(
            position.lineNumber,
            word.startColumn || 0,
            position.lineNumber, word?.endColumn || 0
          )
          return {
            range,
            contents
          }
        } else {
          const line = model.getLineContent(position.lineNumber)
          const start = Math.max(0, word.startColumn - 2)
          const end = Math.min(line.length, word.endColumn + 2)
          const content = line.slice(start, end)
          
          if (isReference(content)) {
            const contents = [
              {
                value: 'Reference'
              },
              {
                value: word.word
              }
            ]
            const range = new monaco.Range(
              position.lineNumber,
              word.startColumn || 0,
              position.lineNumber, word?.endColumn || 0
            )
            return {
              range,
              contents
            }
          } else if (isAction(content)) {
            const contents = [
              {
                value: 'Action'
              },
              {
                value: word.word
              }
            ]
            const range = new monaco.Range(
              position.lineNumber,
              word.startColumn || 0,
              position.lineNumber, word?.endColumn || 0
            )
            return {
              range,
              contents
            }
          }
        }
      } else {
        return null
      }
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
          match = model.findNextMatch(
            '[{|}]',
            position,
            true,
            true,
            null,
            true
          )
        }
      }

      return foldRanges;
    }
  })

  monaco.editor.defineTheme('graphTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: getThemeRules(),
    colors: {}
  })
}