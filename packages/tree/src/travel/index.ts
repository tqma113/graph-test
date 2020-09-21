import { TreeNodeKind } from '../index'
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

export type ActualNode =
  | Tree
  | TreeBlock
  | ActionNode
  | GotoNode
  | IfTree
  | SwitchTree
  | CaseNode
  | DefaultNode

export type TravelCallee = (node: ActualNode) => void

export const travel = (tree: Tree, callee: TravelCallee) => {
  travelTree(tree, callee)
}

export const travelTree = (tree: Tree, callee: TravelCallee) => {
  callee(tree)
  tree.blocks.forEach((treeBlock) => travelTreeBlock(treeBlock, callee))
}

export const travelTreeBlock = (treeBlock: TreeBlock, callee: TravelCallee) => {
  callee(treeBlock)
  treeBlock.children.forEach((node) => travelBlockNode(node, callee))
}

export const travelBlockNode = (node: TreeBlockNode, callee: TravelCallee) => {
  switch (node.kind) {
    case TreeNodeKind.ActionNode: {
      travelActionNode(node, callee)
      break
    }
    case TreeNodeKind.GotoNode: {
      travelGotoNode(node, callee)
      break
    }
    case TreeNodeKind.IfTree: {
      travelIfTree(node, callee)
      break
    }
    case TreeNodeKind.SwitchTree: {
      travelSwitchTree(node, callee)
      break
    }
  }
}

export const travelActionNode = (
  actionNode: ActionNode,
  callee: TravelCallee
) => {
  callee(actionNode)
}

export const travelGotoNode = (gotoNode: GotoNode, callee: TravelCallee) => {
  callee(gotoNode)
}

export const travelIfTree = (ifTree: IfTree, callee: TravelCallee) => {
  callee(ifTree)
  ifTree.successChildren.forEach((node) => travelBlockNode(node, callee))
  if (ifTree.faildChildren.length > 0) {
    ifTree.faildChildren.forEach((node) => travelBlockNode(node, callee))
  }
}

export const travelSwitchTree = (
  switchTree: SwitchTree,
  callee: TravelCallee
) => {
  callee(switchTree)
  switchTree.children.forEach((caseNode) => travelCaseNode(caseNode, callee))
  if (switchTree.defaultChild !== null) {
    travelDefaultNode(switchTree.defaultChild, callee)
  }
}

export const travelCaseNode = (caseNode: CaseNode, callee: TravelCallee) => {
  callee(caseNode)
  caseNode.children.map((node) => travelBlockNode(node, callee))
}

export const travelDefaultNode = (
  defaultNode: DefaultNode,
  callee: TravelCallee
) => {
  callee(defaultNode)
  defaultNode.children.map((node) => travelBlockNode(node, callee))
}
