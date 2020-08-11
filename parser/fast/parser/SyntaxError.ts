import type { Token } from '../lexer'

export class SyntaxError extends Error {
  type = 'error' as const
  token: Token

  constructor(message: string, token: Token) {
    super(message)

    this.name = 'SyntaxError'
    this.message = message
    this.token = token
  }

  toString() {
    return `${this.message} at line: ${this.token.range.start.line}, column: ${this.token.range.start.column}`
  }
}