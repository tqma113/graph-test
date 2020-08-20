import type { Range } from '../index'
import type { Fragment } from '../parser/ast'

export class SemanticError extends Error {
  kind = 'error' as const
  fragment: Fragment
  range: Range

  constructor(message: string, fragment: Fragment) {
    super(message)

    this.name = 'SemanticError'
    this.message = message
    this.fragment = fragment
    this.range = fragment.range
    this.stack = `${message} at line: ${fragment.range.start.line}, column: ${fragment.range.start.column}`
  }
}
