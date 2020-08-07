import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const getLanguageConfiguration = (): monaco.languages.LanguageConfiguration => {
  return {
    autoClosingPairs: [
      {
        open: '<',
        close: '>'
      },
      {
        open: '{',
        close: '}'
      },
      {
        open: '[',
        close: ']'
      },
      {
        open: '"',
        close: '"'
      }
    ]
  }
}

export default getLanguageConfiguration