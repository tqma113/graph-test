import { NodeKind } from '../index'
import { LeafNodeKind, AntherNodeKind } from './index'
import type { TreeNodeRecord } from './index'
import type {
  RichTree,
  RichTreeBlock,
  RichTreeNode,
  RichActionNode,
  RichGotoNode,
  RichIfTree,
  RichSwitchTree,
  RichCaseNode,
  RichDefaultNode,
} from '../richTree'

export const unfoldRich = (tree: RichTree): TreeNodeRecord[] => {
  const unfoldTree = (tree: RichTree): TreeNodeRecord[] => {
    const record = createTNLNR(tree.id, NodeKind.Tree, 0, 0)
    return [
      record,
      ...unfoldTreeBlocks(tree.blocks, record.id),
      ...unfoldStarts(tree.starts, record.id),
      ...unfoldComments(tree.comments, record.id),
    ]
  }

  const unfoldTreeBlocks = (
    treeBlocks: RichTreeBlock[],
    parentId: number
  ): TreeNodeRecord[] => {
    const draftArr = treeBlocks.map((treeBlock, index) => {
      return unfoldTreeBlock(treeBlock, parentId, index)
    })
    return flat(draftArr)
  }

  const unfoldTreeBlock = (
    treeBlock: RichTreeBlock,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(
      treeBlock.id,
      NodeKind.TreeBlock,
      parentId,
      index
    )
    return [
      record,
      unfoldName(treeBlock.name, record.id),
      ...unfoldTreeNodes(treeBlock.children, record.id),
      ...unfoldComments(treeBlock.comments, record.id),
    ]
  }

  const unfoldTreeNodes = (
    treeNodes: RichTreeNode[],
    parentId: number
  ): TreeNodeRecord[] => {
    const draftArr = treeNodes.map((treeNode, index) => {
      return unfoldTreeNode(treeNode, parentId, index)
    })
    return flat(draftArr)
  }

  const unfoldTreeNode = (
    treeNode: RichTreeNode,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    switch (treeNode.kind) {
      case NodeKind.ActionNode: {
        return unfoldActionNode(treeNode, parentId, index)
      }
      case NodeKind.GotoNode: {
        return unfoldGotoNode(treeNode, parentId, index)
      }
      case NodeKind.IfTree: {
        return unfoldIfTree(treeNode, parentId, index)
      }
      case NodeKind.SwitchTree: {
        return unfoldSwitchTree(treeNode, parentId, index)
      }
    }
  }

  const unfoldActionNode = (
    actionNode: RichActionNode,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(
      actionNode.id,
      NodeKind.ActionNode,
      parentId,
      index
    )
    return [
      record,
      unfoldExpression(actionNode.expression, record.id),
      ...unfoldComments(actionNode.comments, record.id),
    ]
  }

  const unfoldGotoNode = (
    gotoNode: RichGotoNode,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(gotoNode.id, NodeKind.GotoNode, parentId, index)
    return [
      record,
      unfoldName(gotoNode.name, record.id),
      ...unfoldComments(gotoNode.comments, record.id),
    ]
  }

  const unfoldIfTree = (
    ifTree: RichIfTree,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(ifTree.id, NodeKind.IfTree, parentId, index)
    return [
      record,
      unfoldCondition(ifTree.condition, record.id),
      ...unfoldSuccessChildren(ifTree.successChildren, record.id),
      ...unfoldFaildChildren(ifTree.faildChildren, record.id),
      ...unfoldComments(ifTree.comments, record.id),
    ]
  }

  const unfoldSuccessChildren = (
    treeNodes: RichTreeNode[],
    parentId: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(3.15, AntherNodeKind.SuccessBlock, parentId, 0)
    return [record, ...unfoldTreeNodes(treeNodes, record.id)]
  }

  const unfoldFaildChildren = (
    treeNodes: RichTreeNode[],
    parentId: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(3.14, AntherNodeKind.FaildBlock, parentId, 0)
    return [record, ...unfoldTreeNodes(treeNodes, record.id)]
  }

  const unfoldSwitchTree = (
    switchTree: RichSwitchTree,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(
      switchTree.id,
      NodeKind.SwitchTree,
      parentId,
      index
    )
    return [
      record,
      unfoldCondition(switchTree.condition, record.id),
      ...unfoldCaseNodes(switchTree.children, record.id),
      ...unfoldDefaultNode(switchTree.defaultChild, record.id),
      ...unfoldComments(switchTree.comments, record.id),
    ]
  }

  const unfoldCaseNodes = (
    caseNodes: RichCaseNode[],
    parentId: number
  ): TreeNodeRecord[] => {
    const draftArr = caseNodes.map((caseNode, index) => {
      return unfoldCaseNode(caseNode, parentId, index)
    })
    return flat(draftArr)
  }

  const unfoldCaseNode = (
    caseNode: RichCaseNode,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(caseNode.id, NodeKind.CaseNode, parentId, index)
    return [
      record,
      unfoldExpectation(caseNode.expectation, record.id),
      ...unfoldTreeNodes(caseNode.children, record.id),
      ...unfoldComments(caseNode.comments, record.id),
    ]
  }

  const unfoldDefaultNode = (
    defaultNode: RichDefaultNode | null,
    parentId: number
  ): TreeNodeRecord[] => {
    if (defaultNode === null) {
      return []
    }
    const record = createTNLNR(
      defaultNode.id,
      NodeKind.DefaultNode,
      parentId,
      0
    )
    return [
      record,
      ...unfoldTreeNodes(defaultNode.children, record.id),
      ...unfoldComments(defaultNode.comments, record.id),
    ]
  }

  const unfoldStarts = (
    starts: string[],
    parentId: number
  ): TreeNodeRecord[] => {
    return starts.map((start, index) => {
      return createTLNR(3.14, LeafNodeKind.Start, parentId, index, start)
    })
  }

  const unfoldComments = (
    comments: string[],
    parentId: number
  ): TreeNodeRecord[] => {
    return comments.map((comment, index) => {
      return createTLNR(3.14, LeafNodeKind.Comment, parentId, index, comment)
    })
  }

  const unfoldName = (name: string, parentId: number): TreeNodeRecord => {
    return createTLNR(3.14, LeafNodeKind.Name, parentId, 0, name)
  }

  const unfoldExpression = (
    expression: string,
    parentId: number
  ): TreeNodeRecord => {
    return createTLNR(3.14, LeafNodeKind.Expression, parentId, 0, expression)
  }

  const unfoldCondition = (
    condition: string,
    parentId: number
  ): TreeNodeRecord => {
    return createTLNR(3.14, LeafNodeKind.Condition, parentId, 0, condition)
  }

  const unfoldExpectation = (
    expectation: string,
    parentId: number
  ): TreeNodeRecord => {
    return createTLNR(3.14, LeafNodeKind.Expectation, parentId, 0, expectation)
  }

  const createTNLNR = (
    id: number,
    kind: NodeKind | AntherNodeKind,
    parentId: number,
    floorId: number
  ): TreeNodeRecord => {
    return {
      id,
      kind,
      parentId,
      floorId,
      content: null,
    }
  }

  const createTLNR = (
    id: number,
    kind: LeafNodeKind,
    parentId: number,
    floorId: number,
    content: string
  ): TreeNodeRecord => {
    return {
      id,
      kind,
      parentId,
      floorId,
      content,
    }
  }

  return unfoldTree(tree)
}

const flat = <T extends any>(arr: T[][]): T[] => {
  return arr.reduce((flatArr, cur) => {
    return flatArr.concat(cur)
  }, [] as T[])
}
