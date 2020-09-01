import * as monaco from 'monaco-editor'
import { MODE_ID } from './language'
import { GRAPH_THEME } from './theme'
import server from './language/server'
import { Program } from 'gtl-language'
import { convert, Tree } from 'gtl-tree'

const createEditor = (
  container: HTMLElement,
  value: string,
  options: monaco.editor.IStandaloneEditorConstructionOptions = {},
  onSave?: (content: string, tree: Tree, program: Program) => void,
  onError?: (message: string) => void
) => {
  const model = monaco.editor.createModel(value, MODE_ID)
  const editor = monaco.editor.create(container, {
    ...options,
    value,
    language: MODE_ID,
    theme: GRAPH_THEME,
    model,
  })

  const tryToError = (message: string) => {
    onError && onError(message)
  }

  editor.addAction({
    // An unique identifier of the contributed action.
    id: 'save',

    // A label of the action that will be presented to the user.
    label: 'Save',

    // An optional array of keybindings for the action.
    // Ctrl + S
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],

    // A precondition for this action.
    precondition: undefined,

    // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
    keybindingContext: undefined,

    contextMenuGroupId: 'navigation',

    contextMenuOrder: 1.5,

    // Method that will be executed when the action is triggered.
    // @param editor The editor instance is passed in as a convinience
    run: function (ed) {
      const input = server.input
      const program = server.program
      if (program) {
        if (onSave) {
          const tree = convert(program)
          onSave(input, tree, program)
        }
      } else {
        tryToError('Program maybe empty or has error. Please check it.')
      }
    },
  })

  model.onDidChangeContent((e) => {
    const lines = model.getLinesContent()
    const content = lines.join('\n')
    server.didChange(content)
  })

  server.didChange(value)

  return editor
}

export default createEditor
