import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const getSignatureHelpProvider = (): monaco.languages.SignatureHelpProvider => {
  return {
    provideSignatureHelp(model, position, token, context) {
      // TODO:
      return null
    }
  }
}

export default getSignatureHelpProvider