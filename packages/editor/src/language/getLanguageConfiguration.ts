import * as monaco from "monaco-editor";

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
    wordPattern: /(\"([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\")|(<([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)>)|(\[([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)\])|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g
  }
}

export default getLanguageConfiguration