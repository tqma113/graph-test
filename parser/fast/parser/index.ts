import { createLexer } from '../lexer'
import { SyntaxError } from './SyntaxError'
import type {
  Program,
  ModuleStatement,
  InferenceDeclaration,
  ImportStatement,
  ExportStatement,
  StartStatement,
  Statement,
  StepStatement,
  IfStatement,
  SwitchStatement,
  GotoStatement
} from './ast'

export const createParser = (input: string) => {
  const lexer = createLexer(input)

  let program: Program | null = null
  let errors: SyntaxError[] = []

  const parse = () => {
    if (program) {
      return
    }

  }

  const matchProgram = (): Program => {

  }

  const matchModuleStatement = (): ModuleStatement => {

  }

  const InferenceDeclaration = (): InferenceDeclaration => {

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