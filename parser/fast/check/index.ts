import { SemanticError } from './SemanticError'
import { Program } from '../parser/ast'

export const check = (program: Program): SemanticError[] => {
  let symbolTable = new Map()
  let errors: SemanticError[] = []


  return errors
}