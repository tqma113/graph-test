import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const getDocumentHighlightProvider = (): monaco.languages.DocumentHighlightProvider => {
  return {
    provideDocumentHighlights(model, position, token) {
      // TODO

      return null
    }
  }
}

export default getDocumentHighlightProvider