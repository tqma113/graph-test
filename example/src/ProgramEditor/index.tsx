import React, { useLayoutEffect, useRef, useState } from 'react'
import * as monaco from 'monaco-editor'
import createEditor from './createEditor'
import { Program } from 'gtl-language'
import { FontSizeSelect } from './FontSizeSelect'

export type MonacoEditorProps = {
  onSave?: (program: Program) => void,
  onError?: (message: string) => void
  containerStyle?: React.CSSProperties
  style?: React.CSSProperties
  initialValue?: string
}

const defaultStyle: React.CSSProperties = {
  width: '800px',
  height: '900px',
}

const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  fontSize: 12,
}

function MonacoEditor({ onSave, onError, style, containerStyle, initialValue = '{}' }: MonacoEditorProps) {
  const [value, setValue] = useState(initialValue)
  const [options, setOptions] = useState<
    monaco.editor.IStandaloneEditorConstructionOptions
  >(defaultOptions)
  const containerRef = useRef<HTMLDivElement>(null)
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>()
  const subscription = useRef<monaco.IDisposable>()

  useLayoutEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useLayoutEffect(() => {
    initMonaco()
    return () => {
      destoryMonaco()
    }
  }, [options, value])

  const initMonaco = () => {
    editor.current = createEditor(
      containerRef.current as HTMLElement,
      value,
      options,
      onSave,
      onError
    )
    editor.current.getAction('editor.action.formatDocument').run()
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

  const handleFonSizeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fontSize = Number(event.target.value)
    setOptions({
      ...options,
      fontSize,
    })
  }

  style = {
    ...defaultStyle,
    ...style,
  }

  return (
    <div style={containerStyle}>
    <span>
      <FontSizeSelect
        value={options.fontSize}
        onChange={handleFonSizeSelect}
      />
    </span>
      <div ref={containerRef} style={style} />
    </div>
  )
}

export default MonacoEditor
