/**
 * Convert
 *
 * Transit AST(Abstruct Syntax Tree) to Mid-Tree.
 */

import { FragmentKind } from 'gt-language'
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
import type {
  Program,
  InferenceDefinition,
  ImportStatement,
  StartStatement,
  ExportStatement,
  Block,
  Module,
  StepStatement,
  IfStatement,
  SwitchStatement,
  SwitchBlock,
  CaseClause,
  DefaultClause,
  GotoStatement,
  ModuleStatement,
  ModuleItems,
  Statement,
  Comment,
} from 'gt-language'
import type { Tree, TreeBlock, TreeNode, IfTree } from '../tree'

export const convert = (program: Program): Tree => {
  const convertProgram = (program: Program) => {
    program.moduleStatemens.forEach(convertModuleStatement)
  }

  const convertModuleStatement = (moduleStatement: ModuleStatement) => {
    switch (moduleStatement.kind) {
      case FragmentKind.ImportStatement: {
        convertImportStatement(moduleStatement)
        break
      }
      case FragmentKind.ExportStatement: {
        convertExportStatement(moduleStatement)
        break
      }
      case FragmentKind.StartStatement: {
        convertStartStatement(moduleStatement)
        break
      }
      case FragmentKind.InferenceDefinition: {
        convertInferenceDefinition(moduleStatement)
        break
      }
    }
  }

  const convertInferenceDefinition = (
    inferenceDefinition: InferenceDefinition
  ) => {
    const name = getContent(inferenceDefinition.identifier.word)
    const children = convertBlock(inferenceDefinition.block)
    const comments = inferenceDefinition.comments.map(trimComment)
    blocks.push(createTreeBlock(name, children, comments))
  }

  const convertImportStatement = (importStatement: ImportStatement) => {
    convertModuleItems(importStatement.moduleItems)
  }

  const convertModuleItems = (moduleItems: ModuleItems) => {}

  const convertModule = (module: Module) => {
    if (module.definition) {
      convertInferenceDefinition(module.definition)
    }
  }

  const convertExportStatement = (exportStatement: ExportStatement) => {}

  const convertStartStatement = (startStatement: StartStatement) => {
    const name = getContent(startStatement.module.identifier.word)
    convertModule(startStatement.module)
    starts.push(name)
  }

  const convertBlock = (block: Block): TreeNode[] => {
    return block.list.map(convertStatement)
  }

  const convertStatement = (statement: Statement) => {
    switch (statement.kind) {
      case FragmentKind.StepStatement: {
        return convertStepStatement(statement)
      }
      case FragmentKind.IfStatement: {
        return convertIfStatement(statement)
      }
      case FragmentKind.SwitchStatement: {
        return convertSwitchStatement(statement)
      }
      case FragmentKind.GotoStatement: {
        return convertGotoStatement(statement)
      }
    }
  }

  const convertStepStatement = (stepStatement: StepStatement) => {
    const expression = getContent(stepStatement.expression.word)
    const comments = stepStatement.comments.map(trimComment)
    return createActionNode(expression, comments)
  }

  const convertIfStatement = (ifStatement: IfStatement): IfTree => {
    const expression = getContent(ifStatement.expression.word)
    const successChildren = convertBlock(ifStatement.ifBlock)
    const faildChildren = ifStatement.elseBlock
      ? convertBlock(ifStatement.elseBlock)
      : []
    const comments = ifStatement.comments.map(trimComment)
    return createIfTree(expression, successChildren, faildChildren, comments)
  }

  const convertSwitchStatement = (switchStatement: SwitchStatement) => {
    const condition = getContent(switchStatement.expression.word)
    const [children, defaultChild] = convertSwitchBlock(
      switchStatement.switchBlock
    )
    const comments = switchStatement.comments.map(trimComment)
    return createSwitchTree(condition, children, defaultChild, comments)
  }

  const convertSwitchBlock = (switchBlock: SwitchBlock) => {
    return [
      switchBlock.caseClauses.map(convertCaseClause),
      switchBlock.defaultClause
        ? convertDefaultClause(switchBlock.defaultClause)
        : null,
    ] as const
  }

  const convertCaseClause = (caseClause: CaseClause) => {
    const expectation = getContent(caseClause.expression.word)
    const children = convertBlock(caseClause.block)
    const comments = caseClause.comments.map(trimComment)
    return createCaseNode(expectation, children, comments)
  }

  const convertDefaultClause = (defaultClause: DefaultClause) => {
    const children = convertBlock(defaultClause.block)
    const comments = defaultClause.comments.map(trimComment)
    return createDefaultNode(children, comments)
  }

  const convertGotoStatement = (gotoStatement: GotoStatement) => {
    const name = getContent(gotoStatement.identifier.word)
    const comments = gotoStatement.comments.map(trimComment)
    return createGotoNode(name, comments)
  }

  let blocks: TreeBlock[] = []
  let starts: string[] = []

  convertProgram(program)

  const comments = program.comments.map(trimComment)

  return createTree(blocks, starts, comments)
}

const getContent = (word: string): string => {
  return word.slice(1, word.length - 1)
}

const trimComment = (comment: Comment) => {
  return comment.word.replace(/^#/, '').trim()
}
