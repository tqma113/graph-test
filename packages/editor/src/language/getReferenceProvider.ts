import * as monaco from 'monaco-editor'
import { isReference } from '../utils'
import server from './server'

const getReferenceProvider = (): monaco.languages.ReferenceProvider => {
  return {
    provideReferences(model, position, context, token) {
      const uri = model.uri
      const word = model.getWordAtPosition(position)
      console.log({
        word,
        uri,
        isReference: isReference(word?.word || ''),
      })
      if (word && isReference(word.word)) {
        const name = word.word.slice(1, word.word.length - 1)
        const defination = server.definations.get(name)
        if (defination) {
          return [
            {
              uri,
              range: {
                startLineNumber: defination.definition.range.start.line,
                startColumn: defination.definition.range.start.column,
                endLineNumber: defination.definition.range.end.line,
                endColumn: defination.definition.range.end.column,
              },
            },
          ]
        }
      }

      return null
    },
  }
}

export default getReferenceProvider
