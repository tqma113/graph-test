import { SemanticError } from './SemanticError'
import {
  TokenKind
} from '../lexer/constants'
import {
  FragmentKind
} from '../parser/ast'
import type {
  Program,
  InferenceDeclaration,
  ImportStatement,
  StartStatement,
} from '../parser/ast'
import type {
  Identifier
} from '../lexer/index'


export type Inference = {
  identifier: Identifier,
  declaration: InferenceDeclaration | ImportStatement
}

export const getInferences = (program: Program): Map<string, Inference> => {
  let inferenceTable = new Map<string, Inference>()

  const recordImport = (importStatement: ImportStatement) => {
    importStatement.moduleItems.identifiers.forEach((identifier) => {
      const name = identifier.word.slice(1, identifier.word.length - 1)
      inferenceTable.set(name, {
        identifier,
        declaration: importStatement
      })
    })
  }

  const recordDeclaration = (inferenceDeclaration: InferenceDeclaration) => {
    const name = inferenceDeclaration.identifier.word.slice(1, inferenceDeclaration.identifier.word.length - 1)
    inferenceTable.set(name, {
      identifier: inferenceDeclaration.identifier,
      declaration: inferenceDeclaration
    })
  }

  const recordStart = (startStatement: StartStatement) => {
    if (startStatement.module.declaration) {
      const name = startStatement.module.identifier.word.slice(1, startStatement.module.identifier.word.length - 1)
      inferenceTable.set(name, {
        identifier: startStatement.module.identifier,
        declaration: startStatement.module.declaration
      })
    }
  }
  
  program.moduleStatemens.forEach((moduleStatement) => {
    switch (moduleStatement.type) {
      case FragmentKind.ImportStatement: {
        recordImport(moduleStatement)
        break
      }
      case FragmentKind.InferenceDeclaration: {
        recordDeclaration(moduleStatement)
        break
      }
      case FragmentKind.StartStatement: {
        recordStart(moduleStatement)
        break
      }
    }
  })

  return inferenceTable
}

export const check = (program: Program, table?: Map<string, Inference>): SemanticError[] => {
  let inferenceTable = table || getInferences(program)
  let errors: SemanticError[] = []


  return errors
}