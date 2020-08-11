import type { Token } from '../lexer'
import type { Range } from '../index'

export type Program = {
  moduleStatemens: ModuleStatement[]
  range: Range
}

export type ModuleStatement
  = InferenceDeclaration | ImportStatement | ExportStatement | StartStatement

export type InferenceDeclaration = {
  identifier: Token,
  block: Block,
  range: Range
}

export type ImportStatement = {
  moduleItems: ModuleItems,
  path: Token,
  range: Range
}

export type ModuleItems = {
  identifiers: Token[],
  range: Range
}

export type ExportStatement = {
  identifier: Token,
  range: Range
}

export type StartStatement = {
  identifier: Token,
  range: Range
}

export type Block = {
  list: Statement[],
  range: Range
}

export type Statement
  = StepStatement | IfStatement | SwitchStatement | GotoStatement

export type StepStatement = {
  action: Token,
  range: Range
}

export type IfStatement = {
  expression: Token,
  ifBlock: Block,
  elseBlock: Block | null,
  range: Range
}

export type SwitchStatement = {
  expression: Token,
  switchBlock: SwitchBlock,
  range: Range
}

export type SwitchBlock = {
  caseClauses: CaseClause[],
  defaultClause: DefaultClause | null,
  range: Range
}

export type CaseClause = {
  expression: Token,
  block: Block,
  range: Range
}

export type DefaultClause = {
  block: Block,
  range: Range
}

export type GotoStatement = {
  identifier: Token,
  range: Range
}