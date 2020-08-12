import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import registerDiagnosticsAdapter from './registerDiagnosticsAdapter'
import getDocumentHighlightProvider from './getDocumentHighlightProvider'
import getCompletionItemProvider from './getCompletionItemProvider'
import getLanguageConfiguration from './getLanguageConfiguration'
import getSignatureHelpProvider from './getSignatureHelpProvider'
import getDefinitionProvider from './getDefinitionProvider'
import getReferenceProvider from './getReferenceProvider'
import getHoverProvider from './getHoverProvider'
import getTokenProvider from './getTokenProvider'

export const MODE_ID = 'graph'

export default () => {
  monaco.languages.register({ id: MODE_ID })

  monaco.languages.setLanguageConfiguration(MODE_ID, getLanguageConfiguration())
  monaco.languages.setMonarchTokensProvider(MODE_ID, getTokenProvider())
  monaco.languages.registerCompletionItemProvider(MODE_ID, getCompletionItemProvider())
  monaco.languages.registerSignatureHelpProvider(MODE_ID, getSignatureHelpProvider())
  monaco.languages.registerHoverProvider(MODE_ID, getHoverProvider());
  monaco.languages.registerDocumentHighlightProvider(MODE_ID, getDocumentHighlightProvider())
  monaco.languages.registerReferenceProvider(MODE_ID, getReferenceProvider())
  monaco.languages.registerDefinitionProvider(MODE_ID, getDefinitionProvider())
  
  registerDiagnosticsAdapter()
}