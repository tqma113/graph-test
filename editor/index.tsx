import React, { useLayoutEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import registerLanguage from './language'
import { initTheme } from './theme'
import createEditor from './createEditor'

export type MonacoEditorProps = {
  onChange?: (content: string) => void
  onSave?: (content: string) => void
  style?: React.CSSProperties
  initialValue?: string
}

const defaultStyle: React.CSSProperties = {
  width: '800px',
  height: '900px'
}

function MonacoEditor({
  onChange,
  style,
  initialValue
}: MonacoEditorProps) {
  const [value, setValue] = useState(initialValue)
  const containerRef = useRef<HTMLDivElement>(null)
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>()
  const subscription = useRef<monaco.IDisposable>()

  useLayoutEffect(() => {
    setValue(value || '# start from here\n\n')
  }, [])

  useLayoutEffect(() => {
    initMonaco()
    return () => {
      destoryMonaco()
    }
  }, [])


  const initMonaco = () => {
    registerLanguage()
    initTheme()
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
          onChange(content)
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