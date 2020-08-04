import React, { useLayoutEffect, useRef } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

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
    editor.current = monaco.editor.create(
      containerRef.current as HTMLElement,
      {
        value,
        language: 'graph',
        theme: 'graphTheme',
        suggestOnTriggerCharacters: true,
        parameterHints: {
          enabled: true,
        }
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
          [/->/, 'operator.arrow'],
          [/=/, 'operator.assign'],
          [/,/, 'operator.comma'],
          [/;/, 'operator.semicolon'],
          [/\bstart\b/, 'keyword'],
          [/\bgoto\b/, 'keyword'],
          [/\bif\b/, 'keyword'],
          [/\belse\b/, 'keyword'],
          [/\bswitch\b/, 'keyword'],
          [/\bcase\b/, 'keyword'],
          [/\bdefault\b/, 'keyword'],
          [/\bimport\b/, 'keyword'],
          [/\bfrom\b/, 'keyword'],
          [/\bexport\b/, 'keyword'],
          [/\[.*\]/, 'action'],
          [/<.*>/, 'identifier'],
          [/".*"/, 'path'],
          [/#.*/, 'comment'],
        ],
      }
    })

    // monaco.languages.registerReferenceProvider('graph', {
    //   provideReferences(model, position, context, token) {
    //     console.log({
    //       model, position, context, token
    //     })
    //     return null
    //   }
    // })

    // monaco.languages.registerSignatureHelpProvider('graph', {
    //   signatureHelpTriggerCharacters: ['['],
    //   signatureHelpRetriggerCharacters: ['<'],
    //   provideSignatureHelp(model, position, token, context) {
    //     console.log({
    //       model, position, context, token
    //     })
    //     return null
    //   }
    // })

    monaco.languages.registerCompletionItemProvider('graph', {
      triggerCharacters: ['['],
      provideCompletionItems(model, position, context, token) {
        console.log({
          model, position, context, token
        })
        return null
      }
    })

    monaco.editor.defineTheme('graphTheme', {
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