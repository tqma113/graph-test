import React, { useLayoutEffect, useRef } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import register from './register'

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
      }
    )
    editor.current.addAction({
      // An unique identifier of the contributed action.
      id: 'save',
    
      // A label of the action that will be presented to the user.
      label: 'Save',
    
      // An optional array of keybindings for the action.
      // Ctrl + S
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
      ],
    
      // A precondition for this action.
      precondition: undefined,
    
      // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
      keybindingContext: undefined,
    
      contextMenuGroupId: 'navigation',
    
      contextMenuOrder: 1.5,
    
      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      run: function(ed) {
        // TODO: do save operation
        console.log("i'm running => " + ed.getPosition());
      }
    });

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