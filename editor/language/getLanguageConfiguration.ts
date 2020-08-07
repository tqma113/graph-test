import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const getLanguageConfiguration = (): monaco.languages.LanguageConfiguration => {
  return {
    comments: {
      lineComment: '#'
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['<', '>'],
    ],
    folding: {
      offSide: true,
      markers: {
        start: /{/,
        end: /}/
      }
    },
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
    ],
    surroundingPairs: [
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
    ],
    wordPattern: /(.*)|(\[.*\])|(<.*>)|(".*")/
  }
}

export default getLanguageConfiguration