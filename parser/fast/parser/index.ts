import { createLexer } from '../lexer'
import type { Range } from '../index'

export type Program = {
  moduleStatemens: []

}

export const createParser = (input: string) => {
  const lexer = createLexer(input)


}