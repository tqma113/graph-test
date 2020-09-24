import * as monaco from 'monaco-editor'
import { Tree } from 'gt-tree'

const createEditor = (
  container: HTMLElement,
  value: string,
  options: monaco.editor.IStandaloneEditorConstructionOptions = {},
  onSave?: (tree: Tree) => void,
  onError?: (message: string) => void
) => {
  const model = monaco.editor.createModel(value, 'json')
  const editor = monaco.editor.create(container, {
    ...options,
    value,
    language: 'json',
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
      const lines = model.getLinesContent()
      const content = lines.join('\n')
      try {
        const tree = JSON.parse(content)
        onSave && onSave(tree)
      } catch (err) {
        tryToError(err)
      }
    },
  })

  return editor
}

export default createEditor
