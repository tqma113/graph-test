import { TreeBlockNodeKindType, TreeNodeKind } from '../index'
import {
  createTreeBlock,
  createActionNode,
  createIfTree,
  createSwitchTree,
  createCaseNode,
  createDefaultNode,
  createGotoNode,
  createTree,
} from '../tree'
import { LeafNodeKind, AntherNodeKind } from './index'
import type { TreeNodeRecord } from './index'
import type {
  Tree,
  TreeBlock,
  TreeBlockNode,
  ActionNode,
  GotoNode,
  IfTree,
  SwitchTree,
  CaseNode,
  DefaultNode,
} from '../tree'

export const fold = (records: TreeNodeRecord[]): Tree => {
  const foldTree = (): Tree => {
    const record = records.find(
      (record) => record.parentId === 0 && record.kind === TreeNodeKind.Tree
    )

    if (!record) {
      throw new Error('Canot find the root record of the document.')
    }

    const blocks = foldTreeBlocks(record.id)
    const starts = foldStarts(record.id)
    const comments = foldComments(record.id)

    return createTree(blocks, starts, comments)
  }

  const foldTreeBlocks = (parentId: number): TreeBlock[] => {
    return records
      .filter(
        (record) =>
          record.parentId === parentId && record.kind === TreeNodeKind.TreeBlock
      )
      .sort((a, b) => a.floorId - b.floorId)
      .map((record) => foldTreeBlock(record.id))
  }

  const foldTreeBlock = (id: number): TreeBlock => {
    const name = foldName(id)
    const children = foldTreeBlockNodes(id)
    const comments = foldComments(id)

    return createTreeBlock(name, children, comments)
  }

  const foldTreeBlockNodes = (parentId: number): TreeBlockNode[] => {
    return records
      .filter(
        (record) =>
          record.parentId === parentId &&
          (record.kind === TreeNodeKind.ActionNode ||
            record.kind === TreeNodeKind.GotoNode ||
            record.kind === TreeNodeKind.IfTree ||
            record.kind === TreeNodeKind.SwitchTree)
      )
      .sort((a, b) => a.floorId - b.floorId)
      .map((record) => foldTreeBlockNode(record.id, record.kind as TreeBlockNodeKindType))
  }

  const foldTreeBlockNode = (id: number, kind: TreeBlockNodeKindType): TreeBlockNode => {
    switch (kind) {
      case TreeNodeKind.ActionNode: {
        return foldActionNode(id)
      }
      case TreeNodeKind.GotoNode: {
        return foldGotoNode(id)
      }
      case TreeNodeKind.IfTree: {
        return foldIfTree(id)
      }
      case TreeNodeKind.SwitchTree: {
        return foldSwitchTree(id)
      }
    }
  }

  const foldActionNode = (id: number): ActionNode => {
    const expression = foldExpression(id)
    const comments = foldComments(id)

    return createActionNode(expression, comments)
  }

  const foldGotoNode = (id: number): GotoNode => {
    const name = foldName(id)
    const comments = foldComments(id)

    return createGotoNode(name, comments)
  }

  const foldIfTree = (id: number): IfTree => {
    const condition = foldCondition(id)
    const successChildren = foldSuccessChildren(id)
    const faildChildren = foldFaildChildren(id)
    const comments = foldComments(id)

    return createIfTree(condition, successChildren, faildChildren, comments)
  }

  const foldSuccessChildren = (parentId: number): TreeBlockNode[] => {
    const record = records.find(
      (record) =>
        record.parentId === parentId &&
        record.kind === AntherNodeKind.SuccessBlock
    )

    if (!record) {
      throw new Error(
        `Canot find the SuccessChildren record of the record: ${parentId}.`
      )
    }

    return foldTreeBlockNodes(record.id)
  }

  const foldFaildChildren = (parentId: number): TreeBlockNode[] => {
    const record = records.find(
      (record) =>
        record.parentId === parentId &&
        record.kind === AntherNodeKind.FaildBlock
    )

    if (!record) {
      throw new Error(
        `Canot find the FaildChildren record of the record: ${parentId}.`
      )
    }

    return foldTreeBlockNodes(record.id)
  }

  const foldSwitchTree = (id: number): SwitchTree => {
    const condition = foldCondition(id)
    const children = foldCaseNodes(id)
    const defaultChild = foldDefaultNode(id)
    const comments = foldComments(id)

    return createSwitchTree(condition, children, defaultChild, comments)
  }

  const foldCaseNodes = (parentId: number): CaseNode[] => {
    return records
      .filter(
        (record) =>
          record.parentId === parentId && record.kind === TreeNodeKind.CaseNode
      )
      .sort((a, b) => a.floorId - b.floorId)
      .map((record) => foldCaseNode(record.id))
  }

  const foldCaseNode = (id: number): CaseNode => {
    const expectation = foldExpectation(id)
    const children = foldTreeBlockNodes(id)
    const comments = foldComments(id)

    return createCaseNode(expectation, children, comments)
  }

  const foldDefaultNode = (parentId: number): DefaultNode | null => {
    const record = records.find(
      (record) =>
        record.parentId === parentId && record.kind === TreeNodeKind.DefaultNode
    )

    if (!record) {
      return null
    }

    const children = foldTreeBlockNodes(record.id)
    const comments = foldComments(record.id)

    return createDefaultNode(children, comments)
  }

  const foldStarts = (parentId: number): string[] => {
    return records
      .filter(
        (record) =>
          record.parentId === parentId && record.kind === LeafNodeKind.Start
      )
      .sort((a, b) => a.floorId - b.floorId)
      .map((record) => record.content) as string[]
  }

  const foldComments = (parentId: number): string[] => {
    return records
      .filter(
        (record) =>
          record.parentId === parentId && record.kind === LeafNodeKind.Comment
      )
      .sort((a, b) => a.floorId - b.floorId)
      .map((record) => record.content) as string[]
  }

  const foldName = (parentId: number): string => {
    const record = records.find(
      (record) =>
        record.parentId === parentId && record.kind === LeafNodeKind.Name
    )

    if (!record) {
      throw new Error(`Canot find the name record of record: ${parentId}`)
    }

    return record.content as string
  }

  const foldExpression = (parentId: number): string => {
    const record = records.find(
      (record) =>
        record.parentId === parentId && record.kind === LeafNodeKind.Expression
    )

    if (!record) {
      throw new Error(`Canot find the expression record of record: ${parentId}`)
    }

    return record.content as string
  }

  const foldCondition = (parentId: number): string => {
    const record = records.find(
      (record) =>
        record.parentId === parentId && record.kind === LeafNodeKind.Condition
    )

    if (!record) {
      throw new Error(`Canot find the condition record of record: ${parentId}`)
    }

    return record.content as string
  }

  const foldExpectation = (parentId: number): string => {
    const record = records.find(
      (record) =>
        record.parentId === parentId && record.kind === LeafNodeKind.Expectation
    )

    if (!record) {
      throw new Error(
        `Canot find the expectation record of record: ${parentId}`
      )
    }

    return record.content as string
  }

  return foldTree()
}
