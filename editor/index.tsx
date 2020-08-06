import React, { useLayoutEffect, useRef } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import register from './register'
import createEditor from './createEditor'

export type MonacoEditorProps = {
  onChange?: (content: string, event: monaco.editor.IModelContentChangedEvent) => void
  style?: React.CSSProperties
  value?: string
}

const defaultStyle: React.CSSProperties = {
  width: '800px',
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
    editor.current = createEditor(
      containerRef.current as HTMLElement,
      value as string
    )

    const model = editor.current.getModel()
    if (model) {
      subscription.current = model.onDidChangeContent((e) => {
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