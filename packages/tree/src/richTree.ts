import { TreeNodeKind } from './index'

export type RichTree = {
  id: number
  kind: TreeNodeKind.Tree
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
    kind: TreeNodeKind.Tree,
    blocks,
    starts,
    comments,
  }
}

export type RichTreeBlock = {
  id: number
  kind: TreeNodeKind.TreeBlock
  name: string
  children: RichTreeBlockNode[]
  comments: string[]
}

export const createRichTreeBlock = (
  id: number,
  name: string,
  children: RichTreeBlockNode[],
  comments: string[]
): RichTreeBlock => {
  return {
    id,
    kind: TreeNodeKind.TreeBlock,
    name,
    children,
    comments,
  }
}

export type RichTreeBlockNode =
  | RichActionNode
  | RichGotoNode
  | RichSwitchTree
  | RichIfTree

export type RichActionNode = {
  id: number
  kind: TreeNodeKind.ActionNode
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
    kind: TreeNodeKind.ActionNode,
    expression,
    comments,
  }
}

export type RichGotoNode = {
  id: number
  kind: TreeNodeKind.GotoNode
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
    kind: TreeNodeKind.GotoNode,
    name,
    comments,
  }
}

export type RichIfTree = {
  id: number
  kind: TreeNodeKind.IfTree
  condition: string
  successChildren: RichTreeBlockNode[]
  faildChildren: RichTreeBlockNode[]
  comments: string[]
}

export const createRichIfTree = (
  id: number,
  condition: string,
  successChildren: RichTreeBlockNode[],
  faildChildren: RichTreeBlockNode[],
  comments: string[]
): RichIfTree => {
  return {
    id,
    kind: TreeNodeKind.IfTree,
    condition,
    successChildren,
    faildChildren,
    comments,
  }
}

export type RichSwitchTree = {
  id: number
  kind: TreeNodeKind.SwitchTree
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
    kind: TreeNodeKind.SwitchTree,
    condition,
    children,
    defaultChild,
    comments,
  }
}

export type RichCaseNode = {
  id: number
  kind: TreeNodeKind.CaseNode
  expectation: string
  children: RichTreeBlockNode[]
  comments: string[]
}

export const createRichCaseNode = (
  id: number,
  expectation: string,
  children: RichTreeBlockNode[],
  comments: string[]
): RichCaseNode => {
  return {
    id,
    kind: TreeNodeKind.CaseNode,
    expectation,
    children,
    comments,
  }
}

export type RichDefaultNode = {
  id: number
  kind: TreeNodeKind.DefaultNode
  children: RichTreeBlockNode[]
  comments: string[]
}

export const createRichDefaultNode = (
  id: number,
  children: RichTreeBlockNode[],
  comments: string[]
): RichDefaultNode => {
  return {
    id,
    kind: TreeNodeKind.DefaultNode,
    children,
    comments,
  }
}
