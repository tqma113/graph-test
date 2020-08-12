import type { Token } from '../lexer'

export class SyntaxError extends Error {
  type = 'error' as const
  token: Token

  constructor(message: string, token: Token) {
    super(message)

    this.name = 'SyntaxError'
    this.message = message
    this.token = token
    this.stack = `${message} at line: ${token.range.start.line}, column: ${token.range.start.column}`
  }
}