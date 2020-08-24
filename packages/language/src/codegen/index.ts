/**
 * Code generation
 * 
 * Transit AST(Abstruct Syntax Tree) to source code.
 */

import { FragmentKind } from '../parser/ast'
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
} from '../parser/ast'
import type { Comment } from '../lexer/token'

export const codegen = (ast: Program): string => {
  const genProgram = (program: Program): string => {
    const moduleStatement = program.moduleStatemens
      .map((moduleStatement) => {
        return genModuleStatement(moduleStatement)
      })
      .join('\n\n')
    const comments =
      program.comments.length > 0
        ? `${program.comments.map((comment) => comment.word).join('\n')}\n`
        : ''
    return moduleStatement + comments
  }

  const genModuleStatement = (moduleStatement: ModuleStatement): string => {
    switch (moduleStatement.kind) {
      case FragmentKind.ImportStatement: {
        return genImportStatement(moduleStatement)
      }
      case FragmentKind.ExportStatement: {
        return genExportStatement(moduleStatement)
      }
      case FragmentKind.StartStatement: {
        return genStartStatement(moduleStatement)
      }
      case FragmentKind.InferenceDefinition: {
        return genInferenceDefinition(moduleStatement)
      }
    }
  }

  const genImportStatement = (importStatement: ImportStatement): string => {
    const comments = genComments(importStatement.comments, 0)
    const moduleItems = genModuleItems(importStatement.moduleItems)
    const path = importStatement.path.word
    return `${comments}import ${moduleItems} from ${path}`
  }

  const genModuleItems = (moduleItems: ModuleItems): string => {
    const identifiers = moduleItems.identifiers
      .map((identifier) => identifier.word)
      .join(', ')
    return `{ ${identifiers} }`
  }

  const genExportStatement = (exportStatement: ExportStatement): string => {
    const comments = genComments(exportStatement.comments, 0)
    const module = genModule(exportStatement.module)
    return `${comments}export ${module}`
  }

  const genModule = (module: Module): string => {
    if (module.definition !== null) {
      return genInferenceDefinition(module.definition)
    } else {
      return module.identifier.word
    }
  }

  const genStartStatement = (startStatement: StartStatement): string => {
    const comments = genComments(startStatement.comments, 0)
    const module = genModule(startStatement.module)
    return `${comments}start ${module}`
  }

  const genInferenceDefinition = (
    inferenceDefinition: InferenceDefinition
  ): string => {
    const comments = genComments(inferenceDefinition.comments, 0)
    const identifier = inferenceDefinition.identifier.word
    const block = genBlock(inferenceDefinition.block, 0)
    return `${comments}${identifier} = ${block}`
  }

  const genBlock = (block: Block, depth: number): string => {
    const prefix = getTabPrefix(depth)
    const list = block.list
      .map((statement) => genStatement(statement, depth + 1))
      .join('\n\n')
    return `{\n${list}\n${prefix}}`
  }

  const genStatement = (statement: Statement, depth: number): string => {
    switch (statement.kind) {
      case FragmentKind.StepStatement: {
        return genStepStatement(statement, depth)
      }
      case FragmentKind.IfStatement: {
        return genIfStatement(statement, depth)
      }
      case FragmentKind.SwitchStatement: {
        return genSwitchStatement(statement, depth)
      }
      case FragmentKind.GotoStatement: {
        return genGotoStatement(statement, depth)
      }
    }
  }

  const genStepStatement = (
    stepStatement: StepStatement,
    depth: number
  ): string => {
    const prefix = getTabPrefix(depth)
    const comments = genComments(stepStatement.comments, depth)
    const expression = stepStatement.expression.word
    return `${comments}${prefix}${expression}`
  }

  const genIfStatement = (ifStatement: IfStatement, depth: number): string => {
    const prefix = getTabPrefix(depth)
    const expression = ifStatement.expression.word
    const comments = genComments(ifStatement.comments, depth)
    const ifBlock = genBlock(ifStatement.ifBlock, depth)
    let source = `${comments}${prefix}if ${expression} -> ${ifBlock}`
    if (ifStatement.elseBlock !== null) {
      const elseBlock = genBlock(ifStatement.elseBlock, depth)
      source += ` else ${elseBlock}`
    }
    return source
  }

  const genSwitchStatement = (
    switchStatement: SwitchStatement,
    depth: number
  ): string => {
    const prefix = getTabPrefix(depth)
    const comments = genComments(switchStatement.comments, depth)
    const expression = switchStatement.expression.word
    const switchBlock = genSwitchBlock(switchStatement.switchBlock, depth)
    return `${comments}${prefix}switch ${expression} ${switchBlock}`
  }

  const genSwitchBlock = (switchBlock: SwitchBlock, depth: number): string => {
    const prefix = getTabPrefix(depth)
    const caseClauses = switchBlock.caseClauses
      .map((caseClause) => genCaseClause(caseClause, depth + 1))
      .join('\n')
    const defaultClause = switchBlock.defaultClause
      ? '\n' + genDefaultClause(switchBlock.defaultClause, depth + 1)
      : ''
    return `{\n${caseClauses}${defaultClause}\n${prefix}}`
  }

  const genCaseClause = (caseClause: CaseClause, depth: number): string => {
    const prefix = getTabPrefix(depth)
    const comments = genComments(caseClause.comments, depth)
    const expression = caseClause.expression.word
    const block = genBlock(caseClause.block, depth)
    return `${comments}${prefix}case ${expression} -> ${block}`
  }

  const genDefaultClause = (
    defaultClause: DefaultClause,
    depth: number
  ): string => {
    const prefix = getTabPrefix(depth)
    const comments = genComments(defaultClause.comments, depth)
    const block = genBlock(defaultClause.block, depth)
    return `${comments}${prefix}default -> ${block}`
  }

  const genGotoStatement = (
    gotoStatement: GotoStatement,
    depth: number
  ): string => {
    const prefix = getTabPrefix(depth)
    const comments = genComments(gotoStatement.comments, depth)
    const identifier = gotoStatement.identifier.word
    return `${comments}${prefix}goto ${identifier}`
  }

  const genComments = (comments: Comment[], depth: number): string => {
    const prefix = getTabPrefix(depth)
    return comments.length > 0
      ? `${comments.map((comment) => prefix + comment.word).join('\n')}\n`
      : ''
  }

  return genProgram(ast)
}

const getTabPrefix = (size: number): string => {
  return new Array(size).fill('  ').join('')
}
