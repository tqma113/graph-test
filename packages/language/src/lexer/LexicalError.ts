import type { Position } from '../index'

export class LexicalError extends Error {
  kind = 'error' as const
  position: Position

  constructor(message: string, position: Position) {
    super(message)

    this.name = 'LexicalError'
    this.message = message
    this.position = position
    this.stack = `${message} at line: ${position.line}, column: ${position.column}`
  }
}