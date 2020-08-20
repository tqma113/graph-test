export type Tree = {
  kind: NodeKind.Tree
  blocks: TreeBlock[]
  starts: string[]
}

export const createTree = (blocks: TreeBlock[], starts: string[]): Tree => {
  return {
    kind: NodeKind.Tree,
    blocks,
    starts,
  }
}

export type TreeBlock = {
  kind: NodeKind.Block
  name: string
  children: Node[]
}

export const createTreeBlock = (name: string, children: Node[]): TreeBlock => {
  return {
    kind: NodeKind.Block,
    name,
    children,
  }
}

export type Node = ActionNode | GotoNode | SwitchTree | IfTree

export type ActionNode = {
  kind: NodeKind.ActionNode
  expression: string
}

export const createActionNode = (expression: string): ActionNode => {
  return {
    kind: NodeKind.ActionNode,
    expression,
  }
}

export type GotoNode = {
  kind: NodeKind.GotoNode
  name: string
}

export const createGotoNode = (name: string): GotoNode => {
  return {
    kind: NodeKind.GotoNode,
    name,
  }
}

export type SwitchTree = {
  kind: NodeKind.SwitchTree
  condition: string
  children: CaseNode[]
  defaultChild: DefaultNode | null
}

export const createSwitchTree = (
  condition: string,
  children: CaseNode[],
  defaultChild: DefaultNode | null
): SwitchTree => {
  return {
    kind: NodeKind.SwitchTree,
    condition,
    children,
    defaultChild,
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
    children,
  }
}

export type DefaultNode = {
  kind: NodeKind.DefaultNode
  children: Node[]
}

export const createDefaultNode = (children: Node[]): DefaultNode => {
  return {
    kind: NodeKind.DefaultNode,
    children,
  }
}

export type IfTree = {
  kind: NodeKind.IfTree
  condition: string
  successChildren: Node[]
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
    faildChildren,
  }
}

export enum NodeKind {
  Tree = 'Tree',
  Block = 'Block',
  ActionNode = 'ActionNode',
  GotoNode = 'GotoNode',
  SwitchTree = 'SwitchTree',
  CaseNode = 'CaseNode',
  DefaultNode = 'DefaultNode',
  IfTree = 'IfTree',
}
