import type { Identifier, Path, Action } from '../lexer'
import type { Range } from '../index'

export enum FragmentKind {
  Program = 'Program',
  InferenceDefinition = 'InferenceDefinition',
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
  kind: FragmentKind.Program,
  moduleStatemens: ModuleStatement[],
  range: Range
}

export const createProgram = (
  moduleStatemens: ModuleStatement[],
  range: Range
): Program => {
  return {
    kind: FragmentKind.Program,
    moduleStatemens,
    range
  }
}

export type ModuleStatement
  = InferenceDefinition | ImportStatement | ExportStatement | StartStatement

export type InferenceDefinition = {
  kind: FragmentKind.InferenceDefinition,
  identifier: Identifier,
  block: Block,
  range: Range
}

export const createInferenceDefinition = (
  identifier: Identifier,
  block: Block,
  range: Range
): InferenceDefinition => {
  return {
    kind: FragmentKind.InferenceDefinition,
    identifier,
    block,
    range
  }
}

export type ImportStatement = {
  kind: FragmentKind.ImportStatement,
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
    kind: FragmentKind.ImportStatement,
    moduleItems,
    path,
    range
  }
}

export type ModuleItems = {
  kind: FragmentKind.ModuleItems,
  identifiers: Identifier[],
  range: Range
}

export const createModuleItems = (
  identifiers: Identifier[],
  range: Range
): ModuleItems => {
  return {
    kind: FragmentKind.ModuleItems,
    identifiers,
    range
  }
}

export type Module = {
  kind: FragmentKind.Module,
  identifier: Identifier,
  definition: InferenceDefinition | null,
  range: Range
}

export const createModule = (
  identifier: Identifier,
  definition: InferenceDefinition | null,
  range: Range
): Module => {
  return {
    kind: FragmentKind.Module,
    identifier,
    definition,
    range
  }
}

export type ExportStatement = {
  kind: FragmentKind.ExportStatement,
  module: Module,
  range: Range
}

export const createExportStatement = (
  module: Module,
  range: Range
): ExportStatement => {
  return {
    kind: FragmentKind.ExportStatement,
    module,
    range
  }
}

export type StartStatement = {
  kind: FragmentKind.StartStatement,
  module: Module,
  range: Range
}

export const createStartStatement = (
  module: Module,
  range: Range
): StartStatement => {
  return {
    kind: FragmentKind.StartStatement,
    module,
    range
  }
}

export type Block = {
  kind: FragmentKind.Block,
  list: Statement[],
  range: Range
}

export const createBlock = (
  list: Statement[],
  range: Range
): Block => {
  return {
    kind: FragmentKind.Block,
    list,
    range
  }
}

export type Statement
  = StepStatement | IfStatement | SwitchStatement | GotoStatement

export type StepStatement = {
  kind: FragmentKind.StepStatement,
  expression: Action,
  range: Range
}

export const createStepStatement = (
  expression: Action,
  range: Range
): StepStatement => {
  return {
    kind: FragmentKind.StepStatement,
    expression,
    range
  }
}

export type IfStatement = {
  kind: FragmentKind.IfStatement,
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
    kind: FragmentKind.IfStatement,
    expression,
    ifBlock,
    elseBlock,
    range
  }
}

export type SwitchStatement = {
  kind: FragmentKind.SwitchStatement,
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
    kind: FragmentKind.SwitchStatement,
    expression,
    switchBlock,
    range
  }
}

export type SwitchBlock = {
  kind: FragmentKind.SwitchBlock,
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
    kind: FragmentKind.SwitchBlock,
    caseClauses,
    defaultClause,
    range
  }
}

export type CaseClause = {
  kind: FragmentKind.CaseClause,
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
    kind: FragmentKind.CaseClause,
    expression,
    block,
    range
  }
}

export type DefaultClause = {
  kind: FragmentKind.DefaultClause,
  block: Block,
  range: Range
}

export const createDefaultClause = (
  block: Block,
  range: Range
): DefaultClause => {
  return {
    kind: FragmentKind.DefaultClause,
    block,
    range
  }
}

export type GotoStatement = {
  kind: FragmentKind.GotoStatement,
  identifier: Identifier,
  range: Range
}

export const createGotoStatement = (
  identifier: Identifier,
  range: Range
): GotoStatement => {
  return {
    kind: FragmentKind.GotoStatement,
    identifier,
    range
  }
}