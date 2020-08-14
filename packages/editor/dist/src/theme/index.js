import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
export var GRAPH_THEME = 'graph-dark';
var getTheme = function () {
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
    };
};
export var initTheme = function () {
    monaco.editor.defineTheme(GRAPH_THEME, getTheme());
};
