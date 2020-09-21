export enum TreeNodeKind {
  Tree = 'Tree',
  TreeBlock = 'TreeBlock',
  ActionNode = 'ActionNode',
  GotoNode = 'GotoNode',
  SwitchTree = 'SwitchTree',
  CaseNode = 'CaseNode',
  DefaultNode = 'DefaultNode',
  IfTree = 'IfTree',
}

export type TreeBlockNodeKindType =
  | TreeNodeKind.ActionNode
  | TreeNodeKind.GotoNode
  | TreeNodeKind.IfTree
  | TreeNodeKind.SwitchTree

export * from './tree'
export * from './richTree'

export * from './fold'
export * from './transit'
export * from './travel'
