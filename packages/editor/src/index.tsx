import React, { useLayoutEffect, useRef, useState } from 'react'
import * as monaco from 'monaco-editor'
import registerLanguage from './language'
import createEditor from './createEditor'
import { initTheme } from './theme'
import { FontSizeSelect } from './component'
import { Tree, Program } from 'gtl-language'

export type MonacoEditorProps = {
  onSave?: (content: string, tree: Tree, program: Program) => void
  onError?: (message: string) => void
  containerStyle?: React.CSSProperties
  style?: React.CSSProperties
  value?: string
  tree?: Tree
}

const defaultStyle: React.CSSProperties = {
  width: '800px',
  height: '900px',
}

const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  fontSize: 12,
}

function MonacoEditor({
  onSave,
  onError,
  style,
  containerStyle,
  value = '# start from here\n\n',
  tree,
}: MonacoEditorProps) {
  const [code, setCode] = useState(value)
  const [options, setOptions] = useState<
    monaco.editor.IStandaloneEditorConstructionOptions
  >(defaultOptions)
  const containerRef = useRef<HTMLDivElement>(null)
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>()
  const subscription = useRef<monaco.IDisposable>()

  useLayoutEffect(() => {
    if (tree) {
      setCode('')
    }
  }, [])

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
      code,
      options,
      onSave,
      onError
    )
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
