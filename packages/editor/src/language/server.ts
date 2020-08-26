/**
 * language server
 * https://microsoft.github.io/language-server-protocol/
 */

import { parse, analysis } from 'gtl-language'
import type {
  Program,
  Inference,
  LexicalError,
  SyntaxError,
  SemanticError,
} from 'gtl-language'

const createServer = (input: string = '') => {
  let program: Program | null = null
  let definitions: Map<string, Inference> = new Map()

  let lexicalErrors: LexicalError[] = []
  let syntaxErrors: SyntaxError[] = []
  let semanticErrors: SemanticError[] = []

  const didChange = (_input: string) => {
    input = _input
    analyze()
  }

  const analyze = () => {
    const {
      program: _program,
      lexcialErrors: _lexcialErrors,
      syntaxErrors: _syntaxErrors,
    } = parse(input)
    lexicalErrors = _lexcialErrors
    syntaxErrors = _syntaxErrors
    if (_program) {
      program = _program
      const { semanticErrors: _semanticErrors, table } = analysis(_program)
      semanticErrors = _semanticErrors
      definitions = table
    } else {
      semanticErrors = []
      definitions = new Map()
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
    get definitions() {
      return definitions
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
