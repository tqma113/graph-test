import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { isReference } from '../utils'

const getDefinitionProvider = (): monaco.languages.DefinitionProvider => {
  return {
    provideDefinition(model, position, token) {
      // TODO
      const resource = model.uri;
      const offset = model.getOffsetAt(position);
      const word = model.getWordAtPosition(position)
      if (word && isReference(word.word)) {
        // TODO: Find definition
      }

      console.log({
        resource,
        offset,
        word
      })

      return null
    }
  }
}

export default getDefinitionProvider