import * as monaco from 'monaco-editor'
import { isKeyword, isValidIdentifierStr, isValidActionStr } from '../utils'

const getKeywordHover = (keyword: string) => {
  switch (keyword) {
    case 'goto':
      return [
        {
          value: 'goto',
        },
        {
          value: 'Enter another progress.',
        },
      ]
    case 'start':
      return [
        {
          value: 'start',
        },
        {
          value: 'Set the progress as a enterance.',
        },
      ]
    default:
      return []
  }
}

const getHoverProvider = (): monaco.languages.HoverProvider => {
  return {
    provideHover: function (model, position, token) {
      let word = model.getWordAtPosition(position)
      if (word) {
        if (isKeyword(word.word)) {
          const contents = getKeywordHover(word.word)
          const range = new monaco.Range(
            position.lineNumber,
            word.startColumn || 0,
            position.lineNumber,
            word?.endColumn || 0
          )
          return {
            range,
            contents,
          }
        } else {
          const line = model.getLineContent(position.lineNumber)
          const start = Math.max(0, word.startColumn - 2)
          const end = Math.min(line.length, word.endColumn + 2)
          const content = line.slice(start, end)

          if (isValidIdentifierStr(content)) {
            const contents = [
              {
                value: 'Reference',
              },
              {
                value: word.word,
              },
            ]
            const range = new monaco.Range(
              position.lineNumber,
              word.startColumn || 0,
              position.lineNumber,
              word?.endColumn || 0
            )
            return {
              range,
              contents,
            }
          } else if (isValidActionStr(content)) {
            const contents = [
              {
                value: 'Action',
              },
              {
                value: word.word,
              },
            ]
            const range = new monaco.Range(
              position.lineNumber,
              word.startColumn || 0,
              position.lineNumber,
              word?.endColumn || 0
            )
            return {
              range,
              contents,
            }
          } else {
            return null
          }
        }
      } else {
        return null
      }
    },
  }
}

export default getHoverProvider
