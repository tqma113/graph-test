import type { Identifier, Path, Action, Comment } from '../lexer'
import type { Range } from '../index'

export enum NodeKind {
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
  GotoStatement = 'GotoStatement',
}

export interface BaseNode {
  kind: NodeKind
  range: Range
}

export type Node =
  | Program
  | Statement
  | ModuleStatement
  | ModuleItems
  | Module
  | Block
  | SwitchBlock
  | CaseClause
  | DefaultClause

export interface Program extends BaseNode {
  kind: NodeKind.Program
  moduleStatemens: ModuleStatement[]
  comments: Comment[]
}

export const createProgram = (
  moduleStatemens: ModuleStatement[],
  range: Range,
  comments: Comment[]
): Program => {
  return {
    kind: NodeKind.Program,
    moduleStatemens,
    range,
    comments,
  }
}

export type ModuleStatement =
  | InferenceDefinition
  | ImportStatement
  | ExportStatement
  | StartStatement

export interface InferenceDefinition extends BaseNode {
  kind: NodeKind.InferenceDefinition
  identifier: Identifier
  block: Block
  comments: Comment[]
}

export const createInferenceDefinition = (
  identifier: Identifier,
  block: Block,
  range: Range,
  comments: Comment[]
): InferenceDefinition => {
  return {
    kind: NodeKind.InferenceDefinition,
    identifier,
    block,
    range,
    comments,
  }
}

export interface ImportStatement extends BaseNode {
  kind: NodeKind.ImportStatement
  moduleItems: ModuleItems
  path: Path
  comments: Comment[]
}

export const createImportStatement = (
  moduleItems: ModuleItems,
  path: Path,
  range: Range,
  comments: Comment[]
): ImportStatement => {
  return {
    kind: NodeKind.ImportStatement,
    moduleItems,
    path,
    range,
    comments,
  }
}

export interface ModuleItems extends BaseNode {
  kind: NodeKind.ModuleItems
  identifiers: Identifier[]
}

export const createModuleItems = (
  identifiers: Identifier[],
  range: Range
): ModuleItems => {
  return {
    kind: NodeKind.ModuleItems,
    identifiers,
    range,
  }
}

export interface Module extends BaseNode {
  kind: NodeKind.Module
  identifier: Identifier
  definition: InferenceDefinition | null
}

export const createModule = (
  identifier: Identifier,
  definition: InferenceDefinition | null,
  range: Range
): Module => {
  return {
    kind: NodeKind.Module,
    identifier,
    definition,
    range,
  }
}

export interface ExportStatement extends BaseNode {
  kind: NodeKind.ExportStatement
  module: Module
  comments: Comment[]
}

export const createExportStatement = (
  module: Module,
  range: Range,
  comments: Comment[]
): ExportStatement => {
  return {
    kind: NodeKind.ExportStatement,
    module,
    range,
    comments,
  }
}

export interface StartStatement extends BaseNode {
  kind: NodeKind.StartStatement
  module: Module
  comments: Comment[]
}

export const createStartStatement = (
  module: Module,
  range: Range,
  comments: Comment[]
): StartStatement => {
  return {
    kind: NodeKind.StartStatement,
    module,
    range,
    comments,
  }
}

export interface Block extends BaseNode {
  kind: NodeKind.Block
  list: Statement[]
}

export const createBlock = (list: Statement[], range: Range): Block => {
  return {
    kind: NodeKind.Block,
    list,
    range,
  }
}

export type Statement =
  | StepStatement
  | IfStatement
  | SwitchStatement
  | GotoStatement

export interface StepStatement extends BaseNode {
  kind: NodeKind.StepStatement
  expression: Action
  comments: Comment[]
}

export const createStepStatement = (
  expression: Action,
  range: Range,
  comments: Comment[]
): StepStatement => {
  return {
    kind: NodeKind.StepStatement,
    expression,
    range,
    comments,
  }
}

export interface IfStatement extends BaseNode {
  kind: NodeKind.IfStatement
  expression: Action
  ifBlock: Block
  elseBlock: Block | null
  comments: Comment[]
}

export const createIfStatement = (
  expression: Action,
  ifBlock: Block,
  elseBlock: Block | null,
  range: Range,
  comments: Comment[]
): IfStatement => {
  return {
    kind: NodeKind.IfStatement,
    expression,
    ifBlock,
    elseBlock,
    range,
    comments,
  }
}

export interface SwitchStatement extends BaseNode {
  kind: NodeKind.SwitchStatement
  expression: Action
  switchBlock: SwitchBlock
  comments: Comment[]
}

export const createSwitchStatement = (
  expression: Action,
  switchBlock: SwitchBlock,
  range: Range,
  comments: Comment[]
): SwitchStatement => {
  return {
    kind: NodeKind.SwitchStatement,
    expression,
    switchBlock,
    range,
    comments,
  }
}

export interface SwitchBlock extends BaseNode {
  kind: NodeKind.SwitchBlock
  caseClauses: CaseClause[]
  defaultClause: DefaultClause | null
}

export const createSwitchBlock = (
  caseClauses: CaseClause[],
  defaultClause: DefaultClause | null,
  range: Range
): SwitchBlock => {
  return {
    kind: NodeKind.SwitchBlock,
    caseClauses,
    defaultClause,
    range,
  }
}

export interface CaseClause extends BaseNode {
  kind: NodeKind.CaseClause
  expression: Action
  block: Block
  comments: Comment[]
}

export const createCaseClause = (
  expression: Action,
  block: Block,
  range: Range,
  comments: Comment[]
): CaseClause => {
  return {
    kind: NodeKind.CaseClause,
    expression,
    block,
    range,
    comments,
  }
}

export interface DefaultClause extends BaseNode {
  kind: NodeKind.DefaultClause
  block: Block
  comments: Comment[]
}

export const createDefaultClause = (
  block: Block,
  range: Range,
  comments: Comment[]
): DefaultClause => {
  return {
    kind: NodeKind.DefaultClause,
    block,
    range,
    comments,
  }
}

export interface GotoStatement extends BaseNode {
  kind: NodeKind.GotoStatement
  identifier: Identifier
  comments: Comment[]
}

export const createGotoStatement = (
  identifier: Identifier,
  range: Range,
  comments: Comment[]
): GotoStatement => {
  return {
    kind: NodeKind.GotoStatement,
    identifier,
    range,
    comments,
  }
}
