import { TreeNodeKind } from '../index'
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

export const unfold = (tree: Tree): TreeNodeRecord[] => {
  const unfoldTree = (tree: Tree): TreeNodeRecord[] => {
    const record = createTNLNR(TreeNodeKind.Tree, 0, 0)
    return [
      record,
      ...unfoldTreeBlocks(tree.blocks, record.id),
      ...unfoldStarts(tree.starts, record.id),
      ...unfoldComments(tree.comments, record.id),
    ]
  }

  const unfoldTreeBlocks = (
    treeBlocks: TreeBlock[],
    parentId: number
  ): TreeNodeRecord[] => {
    const draftArr = treeBlocks.map((treeBlock, index) => {
      return unfoldTreeBlock(treeBlock, parentId, index)
    })
    return flat(draftArr)
  }

  const unfoldTreeBlock = (
    treeBlock: TreeBlock,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(TreeNodeKind.TreeBlock, parentId, index)
    return [
      record,
      unfoldName(treeBlock.name, record.id),
      ...unfoldTreeBlockNodes(treeBlock.children, record.id),
      ...unfoldComments(treeBlock.comments, record.id),
    ]
  }

  const unfoldTreeBlockNodes = (
    treeNodes: TreeBlockNode[],
    parentId: number
  ): TreeNodeRecord[] => {
    const draftArr = treeNodes.map((treeNode, index) => {
      return unfoldTreeBlockNode(treeNode, parentId, index)
    })
    return flat(draftArr)
  }

  const unfoldTreeBlockNode = (
    treeNode: TreeBlockNode,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    switch (treeNode.kind) {
      case TreeNodeKind.ActionNode: {
        return unfoldActionNode(treeNode, parentId, index)
      }
      case TreeNodeKind.GotoNode: {
        return unfoldGotoNode(treeNode, parentId, index)
      }
      case TreeNodeKind.IfTree: {
        return unfoldIfTree(treeNode, parentId, index)
      }
      case TreeNodeKind.SwitchTree: {
        return unfoldSwitchTree(treeNode, parentId, index)
      }
    }
  }

  const unfoldActionNode = (
    actionNode: ActionNode,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(TreeNodeKind.ActionNode, parentId, index)
    return [
      record,
      unfoldExpression(actionNode.expression, record.id),
      ...unfoldComments(actionNode.comments, record.id),
    ]
  }

  const unfoldGotoNode = (
    gotoNode: GotoNode,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(TreeNodeKind.GotoNode, parentId, index)
    return [
      record,
      unfoldName(gotoNode.name, record.id),
      ...unfoldComments(gotoNode.comments, record.id),
    ]
  }

  const unfoldIfTree = (
    ifTree: IfTree,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(TreeNodeKind.IfTree, parentId, index)
    return [
      record,
      unfoldCondition(ifTree.condition, record.id),
      ...unfoldSuccessChildren(ifTree.successChildren, record.id),
      ...unfoldFaildChildren(ifTree.faildChildren, record.id),
      ...unfoldComments(ifTree.comments, record.id),
    ]
  }

  const unfoldSuccessChildren = (
    treeNodes: TreeBlockNode[],
    parentId: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(AntherNodeKind.SuccessBlock, parentId, 0)
    return [record, ...unfoldTreeBlockNodes(treeNodes, record.id)]
  }

  const unfoldFaildChildren = (
    treeNodes: TreeBlockNode[],
    parentId: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(AntherNodeKind.FaildBlock, parentId, 0)
    return [record, ...unfoldTreeBlockNodes(treeNodes, record.id)]
  }

  const unfoldSwitchTree = (
    switchTree: SwitchTree,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(TreeNodeKind.SwitchTree, parentId, index)
    return [
      record,
      unfoldCondition(switchTree.condition, record.id),
      ...unfoldCaseNodes(switchTree.children, record.id),
      ...unfoldDefaultNode(switchTree.defaultChild, record.id),
      ...unfoldComments(switchTree.comments, record.id),
    ]
  }

  const unfoldCaseNodes = (
    caseNodes: CaseNode[],
    parentId: number
  ): TreeNodeRecord[] => {
    const draftArr = caseNodes.map((caseNode, index) => {
      return unfoldCaseNode(caseNode, parentId, index)
    })
    return flat(draftArr)
  }

  const unfoldCaseNode = (
    caseNode: CaseNode,
    parentId: number,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(TreeNodeKind.CaseNode, parentId, index)
    return [
      record,
      unfoldExpectation(caseNode.expectation, record.id),
      ...unfoldTreeBlockNodes(caseNode.children, record.id),
      ...unfoldComments(caseNode.comments, record.id),
    ]
  }

  const unfoldDefaultNode = (
    defaultNode: DefaultNode | null,
    parentId: number
  ): TreeNodeRecord[] => {
    if (defaultNode === null) {
      return []
    }
    const record = createTNLNR(TreeNodeKind.DefaultNode, parentId, 0)
    return [
      record,
      ...unfoldTreeBlockNodes(defaultNode.children, record.id),
      ...unfoldComments(defaultNode.comments, record.id),
    ]
  }

  const unfoldStarts = (
    starts: string[],
    parentId: number
  ): TreeNodeRecord[] => {
    return starts.map((start, index) => {
      return createTLNR(LeafNodeKind.Start, parentId, index, start)
    })
  }

  const unfoldComments = (
    comments: string[],
    parentId: number
  ): TreeNodeRecord[] => {
    return comments.map((comment, index) => {
      return createTLNR(LeafNodeKind.Comment, parentId, index, comment)
    })
  }

  const unfoldName = (name: string, parentId: number): TreeNodeRecord => {
    return createTLNR(LeafNodeKind.Name, parentId, 0, name)
  }

  const unfoldExpression = (
    expression: string,
    parentId: number
  ): TreeNodeRecord => {
    return createTLNR(LeafNodeKind.Expression, parentId, 0, expression)
  }

  const unfoldCondition = (
    condition: string,
    parentId: number
  ): TreeNodeRecord => {
    return createTLNR(LeafNodeKind.Condition, parentId, 0, condition)
  }

  const unfoldExpectation = (
    expectation: string,
    parentId: number
  ): TreeNodeRecord => {
    return createTLNR(LeafNodeKind.Expectation, parentId, 0, expectation)
  }

  const createTNLNR = (
    kind: TreeNodeKind | AntherNodeKind,
    parentId: number,
    floorId: number
  ): TreeNodeRecord => {
    return {
      id: getID(),
      kind,
      parentId,
      floorId,
      content: null,
    }
  }
  const createTLNR = (
    kind: LeafNodeKind,
    parentId: number,
    floorId: number,
    content: string
  ): TreeNodeRecord => {
    return {
      id: getID(),
      kind,
      parentId,
      floorId,
      content,
    }
  }

  let ID = 0
  const getID = (): number => {
    return ++ID
  }

  return unfoldTree(tree)
}

const flat = <T extends any>(arr: T[][]): T[] => {
  return arr.reduce((flatArr, cur) => {
    return flatArr.concat(cur)
  }, [] as T[])
}
