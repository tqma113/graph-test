import { createLexer } from '../lexer'
import { SemanticError } from './SemanticError'
import type { Program } from './ast'

export const createParser = (input: string) => {
  const lexer = createLexer(input)

  let program: Program | null = null
  let errors: SemanticError[] = []

  const parse = () => {
    if (program) {
      return
    }

  }

  return {
    get program() {
      return program
    },
    get tokens() {
      return lexer.tokens
    },
    get syntaxErrors() {
      return lexer.errors
    },
    get semanticErrors() {
      return errors
    },

    parse
  }
}