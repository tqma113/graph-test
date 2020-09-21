import { TreeNodeKind } from './index'

export type Tree = {
  kind: TreeNodeKind.Tree
  blocks: TreeBlock[]
  starts: string[]
  comments: string[]
}

export const createTree = (
  blocks: TreeBlock[],
  starts: string[],
  comments: string[]
): Tree => {
  return {
    kind: TreeNodeKind.Tree,
    blocks,
    starts,
    comments,
  }
}

export type TreeBlock = {
  kind: TreeNodeKind.TreeBlock
  name: string
  children: TreeBlockNode[]
  comments: string[]
}

export const createTreeBlock = (
  name: string,
  children: TreeBlockNode[],
  comments: string[]
): TreeBlock => {
  return {
    kind: TreeNodeKind.TreeBlock,
    name,
    children,
    comments,
  }
}

export type TreeBlockNode = ActionNode | GotoNode | SwitchTree | IfTree

export type ActionNode = {
  kind: TreeNodeKind.ActionNode
  expression: string
  comments: string[]
}

export const createActionNode = (
  expression: string,
  comments: string[]
): ActionNode => {
  return {
    kind: TreeNodeKind.ActionNode,
    expression,
    comments,
  }
}

export type GotoNode = {
  kind: TreeNodeKind.GotoNode
  name: string
  comments: string[]
}

export const createGotoNode = (name: string, comments: string[]): GotoNode => {
  return {
    kind: TreeNodeKind.GotoNode,
    name,
    comments,
  }
}

export type SwitchTree = {
  kind: TreeNodeKind.SwitchTree
  condition: string
  children: CaseNode[]
  defaultChild: DefaultNode | null
  comments: string[]
}

export const createSwitchTree = (
  condition: string,
  children: CaseNode[],
  defaultChild: DefaultNode | null,
  comments: string[]
): SwitchTree => {
  return {
    kind: TreeNodeKind.SwitchTree,
    condition,
    children,
    defaultChild,
    comments,
  }
}

export type CaseNode = {
  kind: TreeNodeKind.CaseNode
  expectation: string
  children: TreeBlockNode[]
  comments: string[]
}

export const createCaseNode = (
  expectation: string,
  children: TreeBlockNode[],
  comments: string[]
): CaseNode => {
  return {
    kind: TreeNodeKind.CaseNode,
    expectation,
    children,
    comments,
  }
}

export type DefaultNode = {
  kind: TreeNodeKind.DefaultNode
  children: TreeBlockNode[]
  comments: string[]
}

export const createDefaultNode = (
  children: TreeBlockNode[],
  comments: string[]
): DefaultNode => {
  return {
    kind: TreeNodeKind.DefaultNode,
    children,
    comments,
  }
}

export type IfTree = {
  kind: TreeNodeKind.IfTree
  condition: string
  successChildren: TreeBlockNode[]
  faildChildren: TreeBlockNode[]
  comments: string[]
}

export const createIfTree = (
  condition: string,
  successChildren: TreeBlockNode[],
  faildChildren: TreeBlockNode[],
  comments: string[]
): IfTree => {
  return {
    kind: TreeNodeKind.IfTree,
    condition,
    successChildren,
    faildChildren,
    comments,
  }
}
