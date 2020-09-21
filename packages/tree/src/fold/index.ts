import { TreeNodeKind } from '../index'

export enum LeafNodeKind {
  Start = 'Start',
  Comment = 'Comment',
  Expression = 'Expression',
  Condition = 'Condition',
  Name = 'Name',
  Expectation = 'Expectation',
}

export enum AntherNodeKind {
  SuccessBlock = 'SuccessBlock',
  FaildBlock = 'FaildBlock',
}

export type TreeNonLeafNodeRecord = {
  id: number
  floorId: number
  parentId: number
  kind: TreeNodeKind | AntherNodeKind
  content: null
}

export type TreeLeafNodeRecord = {
  id: number
  floorId: number
  parentId: number
  kind: LeafNodeKind
  content: string
}

export type TreeNodeRecord = TreeNonLeafNodeRecord | TreeLeafNodeRecord

export type TreeNodeStatusRecord = {
  id: number
  path: number
  status: number
}

export type TreeNodeRecordWithDocumentId = TreeNodeRecord & {
  documentId: number
}

export * from './fold'
export * from './unfold'
export * from './foldRich'
export * from './unfoldRich'
