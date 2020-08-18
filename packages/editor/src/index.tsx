import React, { useLayoutEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import registerLanguage from './language'
import createEditor from './createEditor'
import { initTheme } from './theme'
import { FontSizeSelect } from './component'

export type MonacoEditorProps = {
  onChange?: (content: string) => void
  onSave?: (content: string) => void
  style?: React.CSSProperties
  initialValue?: string
}

const defaultStyle: React.CSSProperties = {
  width: '800px',
  height: '900px',
}

const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  fontSize: 12
}

function MonacoEditor({
  onChange,
  style,
  initialValue
}: MonacoEditorProps) {
  const [value, setValue] = useState(initialValue|| '# start from here\n\n')
  const [options, setOptions] = useState<monaco.editor.IStandaloneEditorConstructionOptions>(defaultOptions)
  const containerRef = useRef<HTMLDivElement>(null)
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>()
  const subscription = useRef<monaco.IDisposable>()

  useLayoutEffect(() => {
    initMonaco()
    return () => {
      destoryMonaco()
    }
  }, [options])

  const initMonaco = () => {
    registerLanguage()
    initTheme()
    editor.current = createEditor(
      containerRef.current as HTMLElement,
      value,
      options
    )

    const model = editor.current.getModel()
    if (model) {
      subscription.current = model.onDidChangeContent((e) => {
        if (onChange) {
          const lines = model.getLinesContent()
          const content = lines.join('\n')

          setValue(content)
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

  const handleFonSizeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fontSize = Number(event.target.value)
    setOptions({
      ...options,
      fontSize
    })
  }

  style = {
    ...defaultStyle,
    ...style
  }
  
  return (
    <div>
      <span>
        <FontSizeSelect value={options.fontSize} onChange={handleFonSizeSelect} />
      </span>
      <div
        ref={containerRef}
        style={style}
      />
    </div>
  );
}

export default MonacoEditor;