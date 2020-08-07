import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const getFoldingRangeProvider = (): monaco.languages.FoldingRangeProvider => {
  return {
    provideFoldingRanges: function(model, context, token) {
      let foldRanges: monaco.languages.FoldingRange[] = []
      let match: monaco.editor.FindMatch | null = null
      let position = new monaco.Position(0, 0)
      let stack: monaco.Position[] = []
      match = model.findNextMatch('[{|}]', position, true, true, null, true)
      
      while (match !== null) {
        let nextPosition = match.range.getEndPosition()
        if (nextPosition.isBefore(position)) {
          break
        } else {
          position = nextPosition
          if (match.matches && match.matches[0] === '{') {
            stack.push(position)
          } else {
            if (stack.length > 0) {
              let start = stack.pop()
              foldRanges.push({
                start: start?.lineNumber || 0,
                end: position.lineNumber
              })
            }
          }
          match = model.findNextMatch(
            '[{|}]',
            position,
            true,
            true,
            null,
            true
          )
        }
      }

      return foldRanges;
    }
  }
}

export default getFoldingRangeProvider