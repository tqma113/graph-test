import type { Fragment } from '../parser/ast'

export class SemanticError extends Error {
  type = 'error' as const
  fragment: Fragment

  constructor(message: string, fragment: Fragment) {
    super(message)

    this.name = 'SemanticError'
    this.message = `${message} at line: ${fragment.range.start.line}, column: ${fragment.range.start.column}`
    this.fragment = fragment
  }

  toString() {
    return 
  }
}