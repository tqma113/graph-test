export enum NodeKind {
  Tree = 'Tree',
  TreeBlock = 'TreeBlock',
  ActionNode = 'ActionNode',
  GotoNode = 'GotoNode',
  SwitchTree = 'SwitchTree',
  CaseNode = 'CaseNode',
  DefaultNode = 'DefaultNode',
  IfTree = 'IfTree',
}

export type TreeNodeKind =
  | NodeKind.ActionNode
  | NodeKind.GotoNode
  | NodeKind.IfTree
  | NodeKind.SwitchTree

export * from './tree'
export * from './richTree'

export * from './fold'
export * from './transit'
export * from './travel'
