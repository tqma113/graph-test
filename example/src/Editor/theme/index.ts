import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export const GRAPH_THEME = 'graph-dark'

const getTheme = (): monaco.editor.IStandaloneThemeData => {
  return {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: '', background: '#282c34' },
      { token: 'comment', foreground: '#7f848e' },
      { token: 'keyword', foreground: '#c678dd' },
      { token: 'path', foreground: '98c379' },
      { token: 'identifier', foreground: '61afef' },
      { token: 'action', foreground: 'e5c07b' },
      { token: 'operator.arrow', foreground: 'c678dd' },
      { token: 'operator.assign', foreground: '61afef' },
    ],
    colors: {}
  }
}

export const initTheme = () => {
  monaco.editor.defineTheme(GRAPH_THEME, getTheme())
}