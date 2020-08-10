import type { Range } from '../index'

export class SyntaxError extends Error {
  type = 'error' as const
  range: Range

  constructor(message: string, range: Range) {
    super(message)

    this.name = 'SyntaxError'
    this.message = message
    this.range = range
  }

  toString() {
    return `${this.message} at line: ${this.range.start.line}, column: ${this.range.start.column}`
  }
}