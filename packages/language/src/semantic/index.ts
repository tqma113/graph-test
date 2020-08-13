import { SemanticError } from './SemanticError'
import {
  FragmentKind
} from '../parser/ast'
import type {
  Program,
  InferenceDeclaration,
  ImportStatement,
  StartStatement,
  ExportStatement,
  Block,
  Module,
  StepStatement,
  IfStatement,
  SwitchStatement,
  SwitchBlock,
  CaseClause,
  DefaultClause,
  GotoStatement,
  ModuleStatement,
  ModuleItems,
  Statement,
  Fragment
} from '../parser/ast'
import type {
  Identifier
} from '../lexer/index'

export type Inference = {
  identifier: Identifier,
  declaration: InferenceDeclaration | ImportStatement
}

export const checkSemantic = (program: Program): SemanticError[] => {
  let inferenceTable = new Map<string, Inference>()
  let errors: SemanticError[] = []

  const record = () => {
    program.moduleStatemens.forEach((moduleStatement) => {
      switch (moduleStatement.kind) {
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
  }

  const recordImport = (importStatement: ImportStatement) => {
    importStatement.moduleItems.identifiers.forEach((identifier) => {
      addInference({
        identifier,
        declaration: importStatement
      })
    })
  }

  const recordDeclaration = (inferenceDeclaration: InferenceDeclaration) => {
    addInference({
      identifier: inferenceDeclaration.identifier,
      declaration: inferenceDeclaration
    })
  }

  const recordStart = (startStatement: StartStatement) => {
    if (startStatement.module.declaration) {
      addInference({
        identifier: startStatement.module.identifier,
        declaration: startStatement.module.declaration
      })
    }
  }

  const addInference = (inference: Inference) => {
    const name = getContent(inference.identifier.word)
    if (inferenceTable.has(name)) {
      reportError(`Module ${name} has been declared twice`, inference.declaration)
    } else {
      inferenceTable.set(name, inference)
    }
  }

  const checkProgram = (program: Program) => {
    program.moduleStatemens.forEach(checkModuleStatement)
  }

  const checkModuleStatement = (moduleStatement: ModuleStatement) => {
    switch (moduleStatement.kind) {
      case FragmentKind.ImportStatement: {
        checkImportStatement(moduleStatement)
        break
      }
      case FragmentKind.ExportStatement: {
        checkExportStatement(moduleStatement)
        break
      }
      case FragmentKind.StartStatement: {
        checkStartStatement(moduleStatement)
        break
      }
      case FragmentKind.InferenceDeclaration: {
        checkInferenceDeclaration(moduleStatement)
        break
      }
    }
  }

  const checkInferenceDeclaration = (inferenceDeclaration: InferenceDeclaration) => {
    checkBlock(inferenceDeclaration.block)
  }

  const checkImportStatement = (importStatement: ImportStatement) => {
    checkModuleItems(importStatement.moduleItems)
  }

  const checkModuleItems = (moduleItems: ModuleItems) => {

  }

  const checkModule = (module: Module) => {
    const name = getContent(module.identifier.word)
    if (!inferenceTable.has(name)) {
      reportError(`Module ${name} has not been declared`, module)
    }
    if (module.declaration) {
      checkInferenceDeclaration(module.declaration)
    }
  }

  const checkExportStatement = (exportStatement: ExportStatement) => {
    checkModule(exportStatement.module)
  }

  const checkStartStatement = (startStatement: StartStatement) => {
    checkModule(startStatement.module)
  }

  const checkBlock = (block: Block) => {
    block.list.forEach(checkStatement)
  }

  const checkStatement = (statement: Statement) => {
    switch (statement.kind) {
      case FragmentKind.StepStatement: {
        checkStepStatement(statement)
        break
      }
      case FragmentKind.IfStatement: {
        checkIfStatement(statement)
        break
      }
      case FragmentKind.SwitchStatement: {
        checkSwitchStatement(statement)
        break
      }
      case FragmentKind.GotoStatement: {
        checkGotoStatement(statement)
        break
      }
    }
  }

  const checkStepStatement = (stepStatement: StepStatement) => {

  }

  const checkIfStatement = (ifStatement: IfStatement) => {
    checkBlock(ifStatement.ifBlock)
    if (ifStatement.elseBlock) {
      checkBlock(ifStatement.elseBlock)
    }
  }

  const checkSwitchStatement = (switchStatement: SwitchStatement) => {
    checkSwitchBlock(switchStatement.switchBlock)
  }

  const checkSwitchBlock = (switchBlock: SwitchBlock) => {
    switchBlock.caseClauses.forEach(checkCaseClause)
    if (switchBlock.defaultClause) {
      checkDefaultClause(switchBlock.defaultClause)
    }
  }

  const checkCaseClause = (caseClause: CaseClause) => {
    checkBlock(caseClause.block)
  }

  const checkDefaultClause = (defaultClause: DefaultClause) => {
    checkBlock(defaultClause.block)
  }

  const checkGotoStatement = (gotoStatement: GotoStatement) => {
    const name = getContent(gotoStatement.identifier.word)
    if (!inferenceTable.has(name)) {
      reportError(`Module ${name} has not been declared`, gotoStatement)
    }
  }

  const reportError = (message: string, fragment: Fragment) => {
    errors.push(new SemanticError(message, fragment))
  }

  record()
  checkProgram(program)

  return errors
}

const getContent = (word: string): string => {
  return word.slice(1, word.length - 1)
}