import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export default (): { [name: string]: monaco.languages.IMonarchLanguageRule[] } => {
  return {
    root: [
      [/->/,          'operator.arrow'],
      [/=/,           'operator.assign'],
      [/,/,           'operator.comma'],
      [/;/,           'operator.semicolon'],
      [/\bstart\b/,   'keyword'],
      [/\bgoto\b/,    'keyword'],
      [/\bif\b/,      'keyword'],
      [/\belse\b/,    'keyword'],
      [/\bswitch\b/,  'keyword'],
      [/\bcase\b/,    'keyword'],
      [/\bdefault\b/, 'keyword'],
      [/\bimport\b/,  'keyword'],
      [/\bfrom\b/,    'keyword'],
      [/\bexport\b/,  'keyword'],
      [/\[.*\]/,      'action'],
      [/<.*>/,        'identifier'],
      [/".*"/,        'path'],
      [/#.*/,         'comment'],
    ]
  }
}