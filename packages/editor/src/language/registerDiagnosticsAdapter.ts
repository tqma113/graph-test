import * as monaco from 'monaco-editor'
import { MODE_ID } from './index'
import server from './server'

const registerDiagnosticsAdapter = () => {
  const doValidate = (model: monaco.editor.IModel) => {
    let markers: monaco.editor.IMarkerData[] = []

    server.lexicalErrors.forEach((error) => {
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: error.message,
        startLineNumber: error.position.line,
        startColumn: error.position.column,
        endLineNumber: error.position.line,
        endColumn: error.position.column,
      })
    })
    server.syntaxErrors.forEach((error) => {
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: error.message,
        startLineNumber: error.token.range.start.line,
        startColumn: error.token.range.start.column,
        endLineNumber: error.token.range.end.line,
        endColumn: error.token.range.end.column,
      })
    })
    server.semanticErrors.forEach((error) => {
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: error.message,
        startLineNumber: error.fragment.range.start.line,
        startColumn: error.fragment.range.start.column,
        endLineNumber: error.fragment.range.end.line,
        endColumn: error.fragment.range.end.column,
      })
    })

    monaco.editor.setModelMarkers(model, MODE_ID, markers)
  }

  let disposables: monaco.IDisposable[] = []
  let listener: Record<string, monaco.IDisposable> = Object.create(null)

  const onModelAdd = (model: monaco.editor.IModel): void => {
    if (model.getModeId() !== MODE_ID) {
      return
    }
    
    let handle: number
    const changeSubscription = model.onDidChangeContent(() => {
      clearTimeout(handle)
      handle = setTimeout(() => doValidate(model), 500) as any
    })

    listener[model.uri.toString()] = {
      dispose() {
        changeSubscription.dispose()
        clearTimeout(handle)
      },
    }

    doValidate(model)
  }

  const onModelRemoved = (model: monaco.editor.IModel): void => {
    monaco.editor.setModelMarkers(model, MODE_ID, [])
    const key = model.uri.toString()
    if (listener[key]) {
      listener[key].dispose()
      delete listener[key]
    }
  }

  disposables.push(monaco.editor.onDidCreateModel(onModelAdd))
  disposables.push(monaco.editor.onWillDisposeModel(onModelRemoved))
  disposables.push({
    dispose() {
      for (const model of monaco.editor.getModels()) {
        onModelRemoved(model)
      }
    },
  })

  monaco.editor.getModels().forEach(onModelAdd)
}

export default registerDiagnosticsAdapter
