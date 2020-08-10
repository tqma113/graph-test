import type { Range } from '../index'

export class SemanticError extends Error {
  type = 'error' as const
  range: Range

  constructor(message: string, range: Range) {
    super(message)

    this.name = 'SemanticError'
    this.message = message
    this.range = range
  }

  toString() {
    return `${this.message} at line: ${this.range.start.line}, column: ${this.range.start.column}`
  }
}