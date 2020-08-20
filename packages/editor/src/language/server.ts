/**
 * language server
 * https://microsoft.github.io/language-server-protocol/
 */

import { createParser, analysis } from '@gtl/language'
import type {
  Program,
  Inference,
  LexicalError,
  SyntaxError,
  SemanticError,
} from '@gtl/language'

const createServer = (input: string = '') => {
  let program: Program | null = null
  let definations: Map<string, Inference> = new Map()

  let lexicalErrors: LexicalError[] = []
  let syntaxErrors: SyntaxError[] = []
  let semanticErrors: SemanticError[] = []

  const didChange = (_input: string) => {
    input = _input
    analyze()
  }

  const analyze = () => {
    const parser = createParser(input)
    parser.parse()
    lexicalErrors = parser.lexcialErrors
    syntaxErrors = parser.syntaxErrors
    if (parser.program) {
      program = parser.program
      const { semanticErrors: _semanticErrors, table } = analysis(
        parser.program
      )
      semanticErrors = _semanticErrors
      definations = table
    } else {
      semanticErrors = []
      definations = new Map()
    }
  }

  analyze()

  return {
    didChange,

    get input() {
      return input
    },
    get program() {
      return program
    },
    get definations() {
      return definations
    },
    get lexicalErrors() {
      return lexicalErrors
    },
    get syntaxErrors() {
      return syntaxErrors
    },
    get semanticErrors() {
      return semanticErrors
    },
  }
}

const languageServer = createServer()

export default languageServer
