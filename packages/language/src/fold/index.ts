import { NodeKind } from '../transit/tree'

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
  id: string
  floorId: number
  parentId: string
  kind: NodeKind | AntherNodeKind
  content: null
}

export type TreeLeafNodeRecord = {
  id: string
  floorId: number
  parentId: string
  kind: LeafNodeKind
  content: string
}

export type TreeNodeRecord = TreeNonLeafNodeRecord | TreeLeafNodeRecord

export type TreeNodeStatusRecord = {
  id: string
  path: string
  status: number
}

export type TreeNodeRecordWithDocumentId = TreeNodeRecord & {
  documentId: string
}

export * from './fold'
export * from './unfold'
