import type { Position } from '../index'

export class SyntaxError extends Error {
  type = 'error' as const
  position: Position

  constructor(message: string, postion: Position) {
    super(message)

    this.name = 'SyntaxError'
    this.message = message
    this.position = postion
  }

  toString() {
    return `${this.message} at line: ${this.position.line}, column: ${this.position.column}`
  }
}