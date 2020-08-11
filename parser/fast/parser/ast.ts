import type { Token } from '../lexer'
import type { Range } from '../index'

export type Program = {
  type: 'Program',
  moduleStatemens: ModuleStatement[],
  range: Range
}

export const createProgram = (
  moduleStatemens: ModuleStatement[],
  range: Range
): Program => {
  return {
    type: 'Program',
    moduleStatemens,
    range
  }
}

export type ModuleStatement
  = InferenceDeclaration | ImportStatement | ExportStatement | StartStatement

export type InferenceDeclaration = {
  type: 'InferenceDeclaration',
  identifier: Token,
  block: Block,
  range: Range
}

export const createInferenceDeclaration = (
  identifier: Token,
  block: Block,
  range: Range
): InferenceDeclaration => {
  return {
    type: 'InferenceDeclaration',
    identifier,
    block,
    range
  }
}

export type ImportStatement = {
  type: 'ImportStatement',
  moduleItems: ModuleItems,
  path: Token,
  range: Range
}

export const createImportStatement = (
  moduleItems: ModuleItems,
  path: Token,
  range: Range
): ImportStatement => {
  return {
    type: 'ImportStatement',
    moduleItems,
    path,
    range
  }
}

export type ModuleItems = {
  type: 'ModuleItems',
  identifiers: Token[],
  range: Range
}

export const createModuleItems = (
  identifiers: Token[],
  range: Range
): ModuleItems => {
  return {
    type: 'ModuleItems',
    identifiers,
    range
  }
}

export type Module = {
  type: 'Module',
  identifier: Token,
  declaration: InferenceDeclaration | null,
  range: Range
}

export const createModule = (
  identifier: Token,
  declaration: InferenceDeclaration | null,
  range: Range
): Module => {
  return {
    type: 'Module',
    identifier,
    declaration,
    range
  }
}

export type ExportStatement = {
  type: 'ExportStatement',
  module: Module,
  range: Range
}

export const createExportStatement = (
  module: Module,
  range: Range
): ExportStatement => {
  return {
    type: 'ExportStatement',
    module,
    range
  }
}

export type StartStatement = {
  type: 'StartStatement',
  module: Module,
  range: Range
}

export const createStartStatement = (
  module: Module,
  range: Range
): StartStatement => {
  return {
    type: 'StartStatement',
    module,
    range
  }
}

export type Block = {
  type: 'Block',
  list: Statement[],
  range: Range
}

export const createBlock = (
  list: Statement[],
  range: Range
): Block => {
  return {
    type: 'Block',
    list,
    range
  }
}

export type Statement
  = StepStatement | IfStatement | SwitchStatement | GotoStatement

export type StepStatement = {
  type: 'StepStatement',
  action: Token,
  range: Range
}

export const createStepStatement = (
  action: Token,
  range: Range
): StepStatement => {
  return {
    type: 'StepStatement',
    action,
    range
  }
}

export type IfStatement = {
  type: 'IfStatement',
  expression: Token,
  ifBlock: Block,
  elseBlock: Block | null,
  range: Range
}

export const createIfStatement = (
  expression: Token,
  ifBlock: Block,
  elseBlock: Block | null,
  range: Range
): IfStatement => {
  return {
    type: 'IfStatement',
    expression,
    ifBlock,
    elseBlock,
    range
  }
}

export type SwitchStatement = {
  type: 'SwitchStatement',
  expression: Token,
  switchBlock: SwitchBlock,
  range: Range
}

export const createSwitchStatement = (
  expression: Token,
  switchBlock: SwitchBlock,
  range: Range
): SwitchStatement => {
  return {
    type: 'SwitchStatement',
    expression,
    switchBlock,
    range
  }
}

export type SwitchBlock = {
  type: 'SwitchBlock'
  caseClauses: CaseClause[],
  defaultClause: DefaultClause | null,
  range: Range
}

export const createSwitchBlock = (
  caseClauses: CaseClause[],
  defaultClause: DefaultClause | null,
  range: Range
): SwitchBlock => {
  return {
    type: 'SwitchBlock',
    caseClauses,
    defaultClause,
    range
  }
}

export type CaseClause = {
  type: 'CaseClause',
  expression: Token,
  block: Block,
  range: Range
}

export const createCaseClause = (
  expression: Token,
  block: Block,
  range: Range
): CaseClause => {
  return {
    type: 'CaseClause',
    expression,
    block,
    range
  }
}

export type DefaultClause = {
  type: 'DefaultClause',
  block: Block,
  range: Range
}

export const createDefaultClause = (
  block: Block,
  range: Range
): DefaultClause => {
  return {
    type: 'DefaultClause',
    block,
    range
  }
}

export type GotoStatement = {
  type: 'GotoStatement',
  identifier: Token,
  range: Range
}

export const createGotoStatement = (
  identifier: Token,
  range: Range
): GotoStatement => {
  return {
    type: 'GotoStatement',
    identifier,
    range
  }
}