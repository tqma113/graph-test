import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { isReference } from '../utils'
import server from './server'

const getDefinitionProvider = (): monaco.languages.DefinitionProvider => {
  return {
    provideDefinition(model, position, token) {
      const uri = model.uri;
      const word = model.getWordAtPosition(position)
      if (word && isReference(word.word)) {
        const name = word.word.slice(1, word.word.length - 1)
        const defination = server.definations.get(name)
        if (defination) {
          return {
            uri,
            range: {
              startLineNumber: defination.definition.range.start.line,
              startColumn: defination.definition.range.start.column,
              endLineNumber: defination.definition.range.end.line,
              endColumn: defination.definition.range.end.column
            }
          }
        }
      }

      return null
    }
  }
}

export default getDefinitionProvider