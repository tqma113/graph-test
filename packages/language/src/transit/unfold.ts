import { NodeKind, LeafNodeKind, AntherNodeKind } from './tree'
import type {
  Tree,
  TreeNodeRecord,
  TreeBlock,
  TreeNode,
  ActionNode,
  GotoNode,
  IfTree,
  SwitchTree,
  CaseNode,
  DefaultNode,
} from './tree'

export const unfold = (tree: Tree): TreeNodeRecord[] => {
  const unfoldTree = (tree: Tree): TreeNodeRecord[] => {
    const record = createTNLNR(NodeKind.Tree, '', 0)

    return [
      record,
      ...unfoldTreeBlocks(tree.blocks, record.id),
      ...unfoldStarts(tree.starts, record.id),
      ...unfoldComments(tree.comments, record.id),
    ]
  }

  const unfoldTreeBlocks = (
    treeBlocks: TreeBlock[],
    parentId: string
  ): TreeNodeRecord[] => {
    return treeBlocks
      .map((treeBlock, index) => {
        return unfoldTreeBlock(treeBlock, parentId, index)
      })
      .flat()
  }

  const unfoldTreeBlock = (
    treeBlock: TreeBlock,
    parentId: string,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(NodeKind.TreeBlock, parentId, index)

    return [
      record,
      unfoldName(treeBlock.name, record.id),
      ...unfoldTreeNodes(treeBlock.children, record.id),
      ...unfoldComments(treeBlock.comments, record.id),
    ]
  }

  const unfoldTreeNodes = (
    treeNodes: TreeNode[],
    parentId: string
  ): TreeNodeRecord[] => {
    return treeNodes
      .map((treeNode, index) => {
        return unfoldTreeNode(treeNode, parentId, index)
      })
      .flat()
  }

  const unfoldTreeNode = (
    treeNode: TreeNode,
    parentId: string,
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
    actionNode: ActionNode,
    parentId: string,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(NodeKind.ActionNode, parentId, index)

    return [
      record,
      unfoldExpression(actionNode.expression, record.id),
      ...unfoldComments(actionNode.comments, record.id),
    ]
  }

  const unfoldGotoNode = (
    gotoNode: GotoNode,
    parentId: string,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(NodeKind.GotoNode, parentId, index)

    return [
      record,
      unfoldName(gotoNode.name, record.id),
      ...unfoldComments(gotoNode.comments, record.id),
    ]
  }

  const unfoldIfTree = (
    ifTree: IfTree,
    parentId: string,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(NodeKind.IfTree, parentId, index)

    return [
      record,
      unfoldCondition(ifTree.condition, record.id),
      ...unfoldSuccessChildren(ifTree.successChildren, record.id),
      ...unfoldFaildChildren(ifTree.faildChildren, record.id),
      ...unfoldComments(ifTree.comments, record.id),
    ]
  }

  const unfoldSuccessChildren = (
    treeNodes: TreeNode[],
    parentId: string
  ): TreeNodeRecord[] => {
    const record = createTNLNR(AntherNodeKind.SuccessBlock, parentId, 0)

    return [record, ...unfoldTreeNodes(treeNodes, record.id)]
  }

  const unfoldFaildChildren = (
    treeNodes: TreeNode[],
    parentId: string
  ): TreeNodeRecord[] => {
    const record = createTNLNR(AntherNodeKind.FaildBlock, parentId, 0)

    return [record, ...unfoldTreeNodes(treeNodes, record.id)]
  }

  const unfoldSwitchTree = (
    switchTree: SwitchTree,
    parentId: string,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(NodeKind.SwitchTree, parentId, index)

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
    parentId: string
  ): TreeNodeRecord[] => {
    return caseNodes
      .map((caseNode, index) => {
        return unfoldCaseNode(caseNode, parentId, index)
      })
      .flat()
  }

  const unfoldCaseNode = (
    caseNode: CaseNode,
    parentId: string,
    index: number
  ): TreeNodeRecord[] => {
    const record = createTNLNR(NodeKind.CaseNode, parentId, index)

    return [
      record,
      unfoldExpectation(caseNode.expectation, record.id),
      ...unfoldTreeNodes(caseNode.children, record.id),
      ...unfoldComments(caseNode.comments, record.id),
    ]
  }

  const unfoldDefaultNode = (
    defaultNode: DefaultNode | null,
    parentId: string
  ): TreeNodeRecord[] => {
    if (defaultNode === null) {
      return []
    }
    const record = createTNLNR(NodeKind.DefaultNode, parentId, 0)

    return [
      record,
      ...unfoldTreeNodes(defaultNode.children, record.id),
      ...unfoldComments(defaultNode.comments, record.id),
    ]
  }

  const unfoldStarts = (
    starts: string[],
    parentId: string
  ): TreeNodeRecord[] => {
    return starts.map((start, index) => {
      return createTLNR(LeafNodeKind.Start, parentId, index, start)
    })
  }

  const unfoldComments = (
    comments: string[],
    parentId: string
  ): TreeNodeRecord[] => {
    return comments.map((comment, index) => {
      return createTLNR(LeafNodeKind.Comment, parentId, index, comment)
    })
  }

  const unfoldName = (name: string, parentId: string): TreeNodeRecord => {
    return createTLNR(LeafNodeKind.Name, parentId, 0, name)
  }

  const unfoldExpression = (
    expression: string,
    parentId: string
  ): TreeNodeRecord => {
    return createTLNR(LeafNodeKind.Expression, parentId, 0, expression)
  }

  const unfoldCondition = (
    condition: string,
    parentId: string
  ): TreeNodeRecord => {
    return createTLNR(LeafNodeKind.Condition, parentId, 0, condition)
  }

  const unfoldExpectation = (
    expectation: string,
    parentId: string
  ): TreeNodeRecord => {
    return createTLNR(LeafNodeKind.Expectation, parentId, 0, expectation)
  }

  const createTNLNR = (
    kind: NodeKind | AntherNodeKind,
    parentId: string,
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
    parentId: string,
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
  const getID = (): string => {
    return String(ID++)
  }

  return unfoldTree(tree)
}
