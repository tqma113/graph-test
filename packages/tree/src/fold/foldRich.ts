import { TreeBlockNodeKindType, TreeNodeKind } from '../index'
import {
  createRichTreeBlock,
  createRichActionNode,
  createRichIfTree,
  createRichSwitchTree,
  createRichCaseNode,
  createRichDefaultNode,
  createRichGotoNode,
  createRichTree,
} from '../richTree'
import { LeafNodeKind, AntherNodeKind } from './index'
import type { TreeNodeRecord } from './index'
import type {
  RichTree,
  RichTreeBlock,
  RichTreeBlockNode,
  RichActionNode,
  RichGotoNode,
  RichIfTree,
  RichSwitchTree,
  RichCaseNode,
  RichDefaultNode,
} from '../richTree'

export const foldRich = (records: TreeNodeRecord[]): RichTree => {
  const foldTree = (): RichTree => {
    const record = records.find(
      (record) => record.parentId === 0 && record.kind === TreeNodeKind.Tree
    )

    if (!record) {
      throw new Error('Canot find the root record of the document.')
    }

    const blocks = foldTreeBlocks(record.id)
    const starts = foldStarts(record.id)
    const comments = foldComments(record.id)

    return createRichTree(record.id, blocks, starts, comments)
  }

  const foldTreeBlocks = (parentId: number): RichTreeBlock[] => {
    return records
      .filter(
        (record) =>
          record.parentId === parentId && record.kind === TreeNodeKind.TreeBlock
      )
      .sort((a, b) => a.floorId - b.floorId)
      .map((record) => foldTreeBlock(record.id))
  }

  const foldTreeBlock = (id: number): RichTreeBlock => {
    const name = foldName(id)
    const children = foldTreeBlockNodes(id)
    const comments = foldComments(id)

    return createRichTreeBlock(id, name, children, comments)
  }

  const foldTreeBlockNodes = (parentId: number): RichTreeBlockNode[] => {
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
      .map((record) =>
        foldTreeBlockNode(record.id, record.kind as TreeBlockNodeKindType)
      )
  }

  const foldTreeBlockNode = (
    id: number,
    kind: TreeBlockNodeKindType
  ): RichTreeBlockNode => {
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

  const foldActionNode = (id: number): RichActionNode => {
    const expression = foldExpression(id)
    const comments = foldComments(id)

    return createRichActionNode(id, expression, comments)
  }

  const foldGotoNode = (id: number): RichGotoNode => {
    const name = foldName(id)
    const comments = foldComments(id)

    return createRichGotoNode(id, name, comments)
  }

  const foldIfTree = (id: number): RichIfTree => {
    const condition = foldCondition(id)
    const successChildren = foldSuccessChildren(id)
    const faildChildren = foldFaildChildren(id)
    const comments = foldComments(id)

    return createRichIfTree(
      id,
      condition,
      successChildren,
      faildChildren,
      comments
    )
  }

  const foldSuccessChildren = (parentId: number): RichTreeBlockNode[] => {
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

  const foldFaildChildren = (parentId: number): RichTreeBlockNode[] => {
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

  const foldSwitchTree = (id: number): RichSwitchTree => {
    const condition = foldCondition(id)
    const children = foldCaseNodes(id)
    const defaultChild = foldDefaultNode(id)
    const comments = foldComments(id)

    return createRichSwitchTree(id, condition, children, defaultChild, comments)
  }

  const foldCaseNodes = (parentId: number): RichCaseNode[] => {
    return records
      .filter(
        (record) =>
          record.parentId === parentId && record.kind === TreeNodeKind.CaseNode
      )
      .sort((a, b) => a.floorId - b.floorId)
      .map((record) => foldCaseNode(record.id))
  }

  const foldCaseNode = (id: number): RichCaseNode => {
    const expectation = foldExpectation(id)
    const children = foldTreeBlockNodes(id)
    const comments = foldComments(id)

    return createRichCaseNode(id, expectation, children, comments)
  }

  const foldDefaultNode = (parentId: number): RichDefaultNode | null => {
    const record = records.find(
      (record) =>
        record.parentId === parentId && record.kind === TreeNodeKind.DefaultNode
    )

    if (!record) {
      return null
    }

    const children = foldTreeBlockNodes(record.id)
    const comments = foldComments(record.id)

    return createRichDefaultNode(record.id, children, comments)
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
