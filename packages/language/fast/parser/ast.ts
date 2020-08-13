import type { Identifier, Path, Action } from '../lexer'
import type { Range } from '../index'

export enum FragmentKind {
  Program = 'Program',
  InferenceDeclaration = 'InferenceDeclaration',
  ImportStatement = 'ImportStatement',
  ModuleItems = 'ModuleItems',
  Module = 'Module',
  ExportStatement = 'ExportStatement',
  StartStatement = 'StartStatement',
  Block = 'Block',
  StepStatement = 'StepStatement',
  IfStatement = 'IfStatement',
  SwitchStatement = 'SwitchStatement',
  SwitchBlock = 'SwitchBlock',
  CaseClause = 'CaseClause',
  DefaultClause = 'DefaultClause',
  GotoStatement = 'GotoStatement'
}

export type Fragment = 
  Program |
  Statement | ModuleStatement |
  ModuleItems | Module |
  Block |
  SwitchBlock | CaseClause | DefaultClause

export type Program = {
  type: FragmentKind.Program,
  moduleStatemens: ModuleStatement[],
  range: Range
}

export const createProgram = (
  moduleStatemens: ModuleStatement[],
  range: Range
): Program => {
  return {
    type: FragmentKind.Program,
    moduleStatemens,
    range
  }
}

export type ModuleStatement
  = InferenceDeclaration | ImportStatement | ExportStatement | StartStatement

export type InferenceDeclaration = {
  type: FragmentKind.InferenceDeclaration,
  identifier: Identifier,
  block: Block,
  range: Range
}

export const createInferenceDeclaration = (
  identifier: Identifier,
  block: Block,
  range: Range
): InferenceDeclaration => {
  return {
    type: FragmentKind.InferenceDeclaration,
    identifier,
    block,
    range
  }
}

export type ImportStatement = {
  type: FragmentKind.ImportStatement,
  moduleItems: ModuleItems,
  path: Path,
  range: Range
}

export const createImportStatement = (
  moduleItems: ModuleItems,
  path: Path,
  range: Range
): ImportStatement => {
  return {
    type: FragmentKind.ImportStatement,
    moduleItems,
    path,
    range
  }
}

export type ModuleItems = {
  type: FragmentKind.ModuleItems,
  identifiers: Identifier[],
  range: Range
}

export const createModuleItems = (
  identifiers: Identifier[],
  range: Range
): ModuleItems => {
  return {
    type: FragmentKind.ModuleItems,
    identifiers,
    range
  }
}

export type Module = {
  type: FragmentKind.Module,
  identifier: Identifier,
  declaration: InferenceDeclaration | null,
  range: Range
}

export const createModule = (
  identifier: Identifier,
  declaration: InferenceDeclaration | null,
  range: Range
): Module => {
  return {
    type: FragmentKind.Module,
    identifier,
    declaration,
    range
  }
}

export type ExportStatement = {
  type: FragmentKind.ExportStatement,
  module: Module,
  range: Range
}

export const createExportStatement = (
  module: Module,
  range: Range
): ExportStatement => {
  return {
    type: FragmentKind.ExportStatement,
    module,
    range
  }
}

export type StartStatement = {
  type: FragmentKind.StartStatement,
  module: Module,
  range: Range
}

export const createStartStatement = (
  module: Module,
  range: Range
): StartStatement => {
  return {
    type: FragmentKind.StartStatement,
    module,
    range
  }
}

export type Block = {
  type: FragmentKind.Block,
  list: Statement[],
  range: Range
}

export const createBlock = (
  list: Statement[],
  range: Range
): Block => {
  return {
    type: FragmentKind.Block,
    list,
    range
  }
}

export type Statement
  = StepStatement | IfStatement | SwitchStatement | GotoStatement

export type StepStatement = {
  type: FragmentKind.StepStatement,
  expression: Action,
  range: Range
}

export const createStepStatement = (
  expression: Action,
  range: Range
): StepStatement => {
  return {
    type: FragmentKind.StepStatement,
    expression,
    range
  }
}

export type IfStatement = {
  type: FragmentKind.IfStatement,
  expression: Action,
  ifBlock: Block,
  elseBlock: Block | null,
  range: Range
}

export const createIfStatement = (
  expression: Action,
  ifBlock: Block,
  elseBlock: Block | null,
  range: Range
): IfStatement => {
  return {
    type: FragmentKind.IfStatement,
    expression,
    ifBlock,
    elseBlock,
    range
  }
}

export type SwitchStatement = {
  type: FragmentKind.SwitchStatement,
  expression: Action,
  switchBlock: SwitchBlock,
  range: Range
}

export const createSwitchStatement = (
  expression: Action,
  switchBlock: SwitchBlock,
  range: Range
): SwitchStatement => {
  return {
    type: FragmentKind.SwitchStatement,
    expression,
    switchBlock,
    range
  }
}

export type SwitchBlock = {
  type: FragmentKind.SwitchBlock,
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
    type: FragmentKind.SwitchBlock,
    caseClauses,
    defaultClause,
    range
  }
}

export type CaseClause = {
  type: FragmentKind.CaseClause,
  expression: Action,
  block: Block,
  range: Range
}

export const createCaseClause = (
  expression: Action,
  block: Block,
  range: Range
): CaseClause => {
  return {
    type: FragmentKind.CaseClause,
    expression,
    block,
    range
  }
}

export type DefaultClause = {
  type: FragmentKind.DefaultClause,
  block: Block,
  range: Range
}

export const createDefaultClause = (
  block: Block,
  range: Range
): DefaultClause => {
  return {
    type: FragmentKind.DefaultClause,
    block,
    range
  }
}

export type GotoStatement = {
  type: FragmentKind.GotoStatement,
  identifier: Identifier,
  range: Range
}

export const createGotoStatement = (
  identifier: Identifier,
  range: Range
): GotoStatement => {
  return {
    type: FragmentKind.GotoStatement,
    identifier,
    range
  }
}