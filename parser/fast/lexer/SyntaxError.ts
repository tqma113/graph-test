import type { Position } from '../index'

export class SyntaxError extends Error {
  position: Position
  type = 'error' as const

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