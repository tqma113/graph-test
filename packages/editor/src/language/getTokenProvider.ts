import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const getTokenProvider = (): monaco.languages.IMonarchLanguage => {
  return {
    tokenizer: {
      root: [
        [/->/,                                                                      'operator.arrow'],
        [/=/,                                                                       'operator.assign'],
        [/,/,                                                                       'operator.comma'],
        [/\bstart\b/,                                                               'keyword'],
        [/\bgoto\b/,                                                                'keyword'],
        [/\bif\b/,                                                                  'keyword'],
        [/\belse\b/,                                                                'keyword'],
        [/\bswitch\b/,                                                              'keyword'],
        [/\bcase\b/,                                                                'keyword'],
        [/\bdefault\b/,                                                             'keyword'],
        [/\bimport\b/,                                                              'keyword'],
        [/\bfrom\b/,                                                                'keyword'],
        [/\bexport\b/,                                                              'keyword'],
        [/{/,                                                                       'bracket.open'],
        [/}/,                                                                       'bracket.open'],
        [/\[([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]*)\]/,      'action'],
        [/<([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]*)>/,        'identifier'],
        [/\"([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]*)\"/,      'path'],
        [/#.*/,                                                                     'comment'],
      ]
    }
  }
}

export default getTokenProvider
