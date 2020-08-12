import type { Fragment } from '../parser/ast'

export class SemanticError extends Error {
  type = 'error' as const
  fragment: Fragment

  constructor(message: string, fragment: Fragment) {
    super(message)

    this.name = 'SemanticError'
    this.message = message
    this.fragment = fragment
  }

  toString() {
    return `${this.message} at line: ${this.fragment.range.start.line}, column: ${this.fragment.range.start.column}`
  }
}