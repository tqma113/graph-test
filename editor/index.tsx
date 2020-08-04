import React, { useLayoutEffect, useRef } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export type MonacoEditorProps = {
  onChange?: (content: string, event: monaco.editor.IModelContentChangedEvent) => void
  style?: React.CSSProperties
  value?: string
}

const defaultStyle: React.CSSProperties = {
  width: '100%',
  height: '900px'
}

function MonacoEditor({
  onChange,
  style,
  value
}: MonacoEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>()
  const subscription = useRef<monaco.IDisposable>()

  useLayoutEffect(() => {
    value = value || '# start from here\n\n'
  }, [])

  useLayoutEffect(() => {
    register()
    initMonaco()

    return () => {
      destoryMonaco()
    }
  }, [])


  const initMonaco = () => {
    editor.current = monaco.editor.create(
      containerRef.current as HTMLElement,
      {
        value,
        language: 'graph',
        theme: 'graphTheme'
      }
    )
    const model = editor.current.getModel()
    if (model) {
      subscription.current = model.onDidChangeContent((e: monaco.editor.IModelContentChangedEvent) => {
        if (onChange) {
          const lines = model.getLinesContent()
          const content = lines.join('\n')
          onChange(content, e)
        }
      })
    }
  }

  const destoryMonaco = () => {
    if (editor.current) {
      editor.current.dispose()
      const model = editor.current.getModel()
      if (model) {
        model.dispose()
      }
    }

    if (subscription.current) {
      subscription.current.dispose()
    }
  }

  const register = () => {
    monaco.languages.register({
      id: 'graph'
    })

    monaco.languages.setMonarchTokensProvider('graph', {
      tokenizer: {
        root: [
          [/^#.*\r$/, 'comment'],
          [/start/, 'keyword'],
          [/goto/, 'keyword'],
          [/if/, 'keyword'],
          [/else/, 'keyword'],
          [/switch/, 'keyword'],
          [/case/, 'keyword'],
          [/default/, 'keyword'],
          [/import/, 'keyword'],
          [/from/, 'keyword'],
          [/export/, 'keyword'],
          [/\[.*\]/, 'action'],
          [/<.*>/, 'identifier'],
          [/<.*>/, 'path'],
          [/\[error.*/, "custom-error"],
          [/\[notice.*/, "custom-notice"],
          [/\[info.*/, "custom-info"],
          [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
        ],
      }
    })

    monaco.editor.defineTheme('graphTheme', {
      base: 'vs-dark',
      inherit: false,
      rules: [
        { token: 'comment', foreground: '#7f848e' },
        { token: 'keyword', foreground: '#e06c75' },
      ],
      colors: {}
    })
  }

  style = {
    ...defaultStyle,
    ...style
  }
  
  return (
    <div
      ref={containerRef}
      style={style}
      className="react-monaco-editor-container"
    />
  );
}

export default MonacoEditor;