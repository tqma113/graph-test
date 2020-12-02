import * as monaco from 'monaco-editor'
import { isValidIdentifierStr } from '../utils'
import server from './server'

const getDefinitionProvider = (): monaco.languages.DefinitionProvider => {
  return {
    provideDefinition(model, position, token) {
      const uri = model.uri
      const word = model.getWordAtPosition(position)
      if (word && isValidIdentifierStr(word.word)) {
        const name = word.word.slice(1, word.word.length - 1)
        const definition = server.definitions.get(name)
        if (definition) {
          return {
            uri,
            range: {
              startLineNumber: definition.definition.range.start.line,
              startColumn: definition.definition.range.start.column,
              endLineNumber: definition.definition.range.end.line,
              endColumn: definition.definition.range.end.column,
            },
          }
        }
      }

      return null
    },
  }
}

export default getDefinitionProvider
