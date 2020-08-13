/**
 * ast visit template
 */

 // @ts-nocheck

import type {
  Program,
  InferenceDeclaration,
  ImportStatement,
  StartStatement,
  ExportStatement,
  Block,
  Module,
  Statement,
  StepStatement,
  IfStatement,
  SwitchStatement,
  SwitchBlock,
  CaseClause,
  DefaultClause,
  GotoStatement,
  ModuleStatement,
  ModuleItems
} from '../parser/ast'

export const visit = (program: Program) => {

  const visitProgram = (program: Program) => {

  }

  const visitModuleStatement = (moduleStatement: ModuleStatement) => {

  }

  const visitInferenceDeclaration = (inferenceDeclaration: InferenceDeclaration) => {

  }

  const visitImportStatement = (importStatement: ImportStatement) => {

  }

  const visitModuleItems = (moduleItems: ModuleItems) => {

  }

  const visitModule = (module: Module) => {

  }

  const visitExportStatement = (exportStatement: ExportStatement) => {

  }

  const visitStartStatement = (startStatement: StartStatement) => {

  }

  const visitBlock = (block: Block) => {

  }

  const checkStatement = (statement: Statement) => {

  }


  const visitStepStatement = (stepStatement: StepStatement) => {

  }

  const visitIfStatement = (ifStatement: IfStatement) => {

  }

  const visitSwitchStatement = (switchStatement: SwitchStatement) => {

  }

  const visitSwitchBlock = (switchBlock: SwitchBlock) => {

  }

  const visitCaseClause = (caseClause: CaseClause) => {

  }

  const visitDefaultClause = (defaultClause: DefaultClause) => {

  }

  const visitGotoStatement = (gotoStatement: GotoStatement) => {

  }
}