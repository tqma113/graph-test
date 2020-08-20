import {
  createProgram,
  createInferenceDefinition,
  createImportStatement,
  createExportStatement,
  createStartStatement,
  createStepStatement,
  createIfStatement,
  createSwitchStatement,
  createGotoStatement,
  createBlock,
  createSwitchBlock,
  createCaseClause,
  createDefaultClause,
  createModuleItems,
  createModule,
} from '../parser/ast'
import { createComment } from '../lexer'
import type {  } from '../lexer'
import type {
  Program,
  ModuleStatement,
  InferenceDefinition,
  ImportStatement,
  ExportStatement,
  StartStatement,
  Statement,
  StepStatement,
  IfStatement,
  SwitchStatement,
  GotoStatement,
  Block,
  SwitchBlock,
  CaseClause,
  DefaultClause,
  ModuleItems,
  Module,
} from '../parser/ast'
import type { Tree, TreeBlock } from './ast'
import type { Comment } from '../lexer'
import type { Range } from '../'

const range: Range = {
  start: {
    line: 0,
    column: 0
  },
  end: {
    line: 0,
    column: 0
  }
}

export const reverse = (tree: Tree): Program => {
  const reverseTree = (tree: Tree) => {
    const moduleStatemens: ModuleStatement[] = []
    const comments: Comment[] = []
    return createProgram(moduleStatemens, range, comments)
  }

  const reverseTreeBlock = (treeBlock: TreeBlock) => {

  }

  const reverseComment = (comment: string): Comment => {
    return createComment(comment, range)
  }

  return reverseTree(tree)
}
