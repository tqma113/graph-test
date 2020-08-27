/**
 * Reverse
 *
 * Transit Mid-Tree to AST(Abstruct Syntax Tree).
 */

import {
  createProgram,
  createInferenceDefinition,
  createStartStatement,
  createStepStatement,
  createIfStatement,
  createSwitchStatement,
  createGotoStatement,
  createBlock,
  createSwitchBlock,
  createCaseClause,
  createDefaultClause,
  createModule,
} from '../parser/ast'
import { createComment, createIdentifier, createAction } from '../lexer'
import { NodeKind } from './tree'
import type { Program, Block } from '../parser/ast'
import type {
  Tree,
  TreeBlock,
  TreeNode,
  ActionNode,
  GotoNode,
  IfTree,
  SwitchTree,
  CaseNode,
  DefaultNode,
} from './tree'
import type { Comment } from '../lexer'
import type { Range } from '../'

const range: Range = {
  start: {
    line: 0,
    column: 0,
  },
  end: {
    line: 0,
    column: 0,
  },
}

const createCommentByContent = (comment: string) => {
  return createComment(`# ${comment}`, range)
}

const createIdentifierByName = (name: string) => {
  return createIdentifier(`<${name}>`, range)
}

const createActionByContent = (expression: string) => {
  return createAction(`[${expression}]`, range)
}

export const reverse = (tree: Tree): Program => {
  const reverseTree = (tree: Tree) => {
    const moduleStatements = tree.blocks.map(reverseTreeBlock)
    const comments = tree.comments.map(reverseComment)
    return createProgram(moduleStatements, range, comments)
  }

  const reverseTreeBlock = (treeBlock: TreeBlock) => {
    if (tree.starts.includes(treeBlock.name)) {
      const identifier = createIdentifierByName(treeBlock.name)
      const block = createBlock(treeBlock.children.map(reverseNode), range)
      const inferenceDefinition = createInferenceDefinition(
        identifier,
        block,
        range,
        []
      )
      const module = createModule(identifier, inferenceDefinition, range)
      const comments = treeBlock.comments.map(reverseComment)
      return createStartStatement(module, range, comments)
    } else {
      const identifier = createIdentifierByName(treeBlock.name)
      const block = createBlock(treeBlock.children.map(reverseNode), range)
      const comments = treeBlock.comments.map(reverseComment)
      return createInferenceDefinition(identifier, block, range, comments)
    }
  }

  const reverseNode = (node: TreeNode) => {
    switch (node.kind) {
      case NodeKind.ActionNode: {
        return reverseActionNode(node)
      }
      case NodeKind.GotoNode: {
        return reverseGotoNode(node)
      }
      case NodeKind.IfTree: {
        return reverseIfTree(node)
      }
      case NodeKind.SwitchTree: {
        return reverseSwitchTree(node)
      }
    }
  }

  const reverseActionNode = (actionNode: ActionNode) => {
    const expression = createActionByContent(actionNode.expression)
    const comments = actionNode.comments.map(reverseComment)
    return createStepStatement(expression, range, comments)
  }

  const reverseGotoNode = (gotoNode: GotoNode) => {
    const identifier = createIdentifierByName(gotoNode.name)
    const comments = gotoNode.comments.map(reverseComment)
    return createGotoStatement(identifier, range, comments)
  }

  const reverseIfTree = (ifTree: IfTree) => {
    const expression = createActionByContent(ifTree.condition)
    const ifBlock = createBlock(ifTree.successChildren.map(reverseNode), range)
    let elseBlock: Block | null = null
    if (ifTree.faildChildren.length > 0) {
      elseBlock = createBlock(ifTree.faildChildren.map(reverseNode), range)
    }
    const comments = ifTree.comments.map(reverseComment)
    return createIfStatement(expression, ifBlock, elseBlock, range, comments)
  }

  const reverseSwitchTree = (switchTree: SwitchTree) => {
    const expression = createActionByContent(switchTree.condition)
    const caseClauses = switchTree.children.map(reverseCaseNode)
    const defaultClause =
      switchTree.defaultChild === null
        ? null
        : reverseDefaultNode(switchTree.defaultChild)
    const switchBlock = createSwitchBlock(caseClauses, defaultClause, range)
    const comments = switchTree.comments.map(reverseComment)
    return createSwitchStatement(expression, switchBlock, range, comments)
  }

  const reverseCaseNode = (caseNode: CaseNode) => {
    const expression = createActionByContent(caseNode.expectation)
    const block = createBlock(caseNode.children.map(reverseNode), range)
    const comments = caseNode.comments.map(reverseComment)
    return createCaseClause(expression, block, range, comments)
  }

  const reverseDefaultNode = (defaultNode: DefaultNode) => {
    const block = createBlock(defaultNode.children.map(reverseNode), range)
    const comments = defaultNode.comments.map(reverseComment)
    return createDefaultClause(block, range, comments)
  }

  const reverseComment = (comment: string): Comment => {
    return createCommentByContent(comment)
  }

  return reverseTree(tree)
}
