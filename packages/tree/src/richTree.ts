import { NodeKind } from './index'

export type RichTree = {
  id: number
  kind: NodeKind.Tree
  blocks: RichTreeBlock[]
  starts: string[]
  comments: string[]
}

export const createRichTree = (
  id: number,
  blocks: RichTreeBlock[],
  starts: string[],
  comments: string[]
): RichTree => {
  return {
    id,
    kind: NodeKind.Tree,
    blocks,
    starts,
    comments,
  }
}

export type RichTreeBlock = {
  id: number
  kind: NodeKind.TreeBlock
  name: string
  children: RichTreeNode[]
  comments: string[]
}

export const createRichTreeBlock = (
  id: number,
  name: string,
  children: RichTreeNode[],
  comments: string[]
): RichTreeBlock => {
  return {
    id,
    kind: NodeKind.TreeBlock,
    name,
    children,
    comments,
  }
}

export type RichTreeNode =
  | RichActionNode
  | RichGotoNode
  | RichSwitchTree
  | RichIfTree

export type RichActionNode = {
  id: number
  kind: NodeKind.ActionNode
  expression: string
  comments: string[]
}

export const createRichActionNode = (
  id: number,
  expression: string,
  comments: string[]
): RichActionNode => {
  return {
    id,
    kind: NodeKind.ActionNode,
    expression,
    comments,
  }
}

export type RichGotoNode = {
  id: number
  kind: NodeKind.GotoNode
  name: string
  comments: string[]
}

export const createRichGotoNode = (
  id: number,
  name: string,
  comments: string[]
): RichGotoNode => {
  return {
    id,
    kind: NodeKind.GotoNode,
    name,
    comments,
  }
}

export type RichIfTree = {
  id: number
  kind: NodeKind.IfTree
  condition: string
  successChildren: RichTreeNode[]
  faildChildren: RichTreeNode[]
  comments: string[]
}

export const createRichIfTree = (
  id: number,
  condition: string,
  successChildren: RichTreeNode[],
  faildChildren: RichTreeNode[],
  comments: string[]
): RichIfTree => {
  return {
    id,
    kind: NodeKind.IfTree,
    condition,
    successChildren,
    faildChildren,
    comments,
  }
}

export type RichSwitchTree = {
  id: number
  kind: NodeKind.SwitchTree
  condition: string
  children: RichCaseNode[]
  defaultChild: RichDefaultNode | null
  comments: string[]
}

export const createRichSwitchTree = (
  id: number,
  condition: string,
  children: RichCaseNode[],
  defaultChild: RichDefaultNode | null,
  comments: string[]
): RichSwitchTree => {
  return {
    id,
    kind: NodeKind.SwitchTree,
    condition,
    children,
    defaultChild,
    comments,
  }
}

export type RichCaseNode = {
  id: number
  kind: NodeKind.CaseNode
  expectation: string
  children: RichTreeNode[]
  comments: string[]
}

export const createRichCaseNode = (
  id: number,
  expectation: string,
  children: RichTreeNode[],
  comments: string[]
): RichCaseNode => {
  return {
    id,
    kind: NodeKind.CaseNode,
    expectation,
    children,
    comments,
  }
}

export type RichDefaultNode = {
  id: number
  kind: NodeKind.DefaultNode
  children: RichTreeNode[]
  comments: string[]
}

export const createRichDefaultNode = (
  id: number,
  children: RichTreeNode[],
  comments: string[]
): RichDefaultNode => {
  return {
    id,
    kind: NodeKind.DefaultNode,
    children,
    comments,
  }
}
