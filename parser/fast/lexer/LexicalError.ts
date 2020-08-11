import type { Position } from '../index'

export class LexicalError extends Error {
  type = 'error' as const
  position: Position

  constructor(message: string, position: Position) {
    super(message)

    this.name = 'LexicalError'
    this.message = `${message} at line: ${position.line}, column: ${position.column}`
    this.position = position
  }
}