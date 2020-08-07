import type { Position, Range } from '../index'

export type Token = {
  text: string,
  range: Range
}

export type Lexer = {
  nextToken: () => Token
  tokens: Token[]
  run: () => void
}

export const createLexer = (input: string): Lexer => {
  let offset = 0
  let forward = 0


  let tokens: Token[] = []

  const nextToken = (): Token => {

  }

  const run = () => {

  }

  return {
    tokens,
    nextToken,
    run
  }
}