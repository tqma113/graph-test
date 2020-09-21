import type { Range } from '../index'
import type { Node } from '../parser/ast'

export class SemanticError extends Error {
  kind = 'error' as const
  fragment: Node
  range: Range

  constructor(message: string, fragment: Node) {
    super(message)

    this.name = 'SemanticError'
    this.message = message
    this.fragment = fragment
    this.range = fragment.range
    this.stack = `${message} at line: ${fragment.range.start.line}, column: ${fragment.range.start.column}`
  }
}
