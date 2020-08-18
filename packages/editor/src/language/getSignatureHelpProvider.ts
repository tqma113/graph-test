import * as monaco from "monaco-editor";

const getSignatureHelpProvider = (): monaco.languages.SignatureHelpProvider => {
  return {
    provideSignatureHelp(model, position, token, context) {
      // TODO:
      return null
    }
  }
}

export default getSignatureHelpProvider