export type Tree = {
  kind: NodeKind.Tree
  blocks: Block[]
  start: string
}

export const createTree = (
  blocks: Block[],
  start: string
): Tree => {
  return {
    kind: NodeKind.Tree,
    blocks,
    start
  }
}

export type Block = {
  kind: NodeKind.Block
  name: string
  children: Node[]
}

export const createBlock = (
  name: string,
  children: Node[]
): Block => {
  return {
    kind: NodeKind.Block,
    name,
    children
  }
}

export type Node = ActionNode | GotoNode | SwitchTree | IfTree

export type ActionNode = {
  kind: NodeKind.ActionNode
  floorId: number,
  expression: string
}

export const createActionNode = (
  floorId: number,
  expression: string
): ActionNode => {
  return {
    kind: NodeKind.ActionNode,
    floorId,
    expression
  }
}

export type GotoNode = {
  kind: NodeKind.GotoNode
  name: string
}

export const createGotoNode = (
  name: string
): GotoNode => {
  return {
    kind: NodeKind.GotoNode,
    name
  }
}

export type SwitchTree = {
  kind: NodeKind.SwitchTree
  condition: string
  children: CaseNode[]
}

export const createSwitchTree = (
  condition: string,
  children: CaseNode[]
): SwitchTree => {
  return {
    kind: NodeKind.SwitchTree,
    condition,
    children
  }
}

export type CaseNode = {
  kind: NodeKind.CaseNode
  expectation: string
  children: Node[]
}

export const createCaseNode = (
  expectation: string,
  children: Node[]
): CaseNode => {
  return {
    kind: NodeKind.CaseNode,
    expectation,
    children
  }
}

export type IfTree = {
  kind: NodeKind.IfTree
  condition: string,
  successChildren: Node[],
  faildChildren: Node[]
}

export const createIfTree = (
  condition: string,
  successChildren: Node[],
  faildChildren: Node[]
): IfTree => {
  return {
    kind: NodeKind.IfTree,
    condition,
    successChildren,
    faildChildren
  }
}

export enum NodeKind {
  Tree = 'Tree',
  Block = 'Block',
  ActionNode = 'ActionNode',
  GotoNode = 'GotoNode',
  SwitchTree = 'SwitchTree',
  CaseNode = 'CaseNode',
  IfTree = 'IfTree'
}