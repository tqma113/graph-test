import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const getDefinitionProvider = (): monaco.languages.DefinitionProvider => {
  return {
    provideDefinition(model, position, token) {
      // TODO

      return null
    }
  }
}

export default getDefinitionProvider