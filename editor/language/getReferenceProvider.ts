import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const getReferenceProvider = (): monaco.languages.ReferenceProvider => {
  return {
    provideReferences(model, position, context, token) {
      // TODO

      return null
    }
  }
}

export default getReferenceProvider