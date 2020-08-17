import {
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
  FragmentKind
} from '../parser/ast'
import {
  Tree,
  Block as TreeBlock,
  Node,
  IfTree,
  NodeKind,
  createBlock,
  createActionNode,
  createIfTree,
  createSwitchTree,
  createCaseNode,
  createDefaultNode,
  createGotoNode
} from './ast'

export const convert = (program: Program): Tree => {
  let blocks: TreeBlock[] = []
  let starts: string[] = []

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

  const convertInferenceDefinition = (inferenceDefinition: InferenceDefinition) => {
    const name = getContent(inferenceDefinition.identifier.word)
    const children = convertBlock(inferenceDefinition.block)
    blocks.push(createBlock(name, children))
  }

  const convertImportStatement = (importStatement: ImportStatement) => {
    convertModuleItems(importStatement.moduleItems)
  }

  const convertModuleItems = (moduleItems: ModuleItems) => {

  }

  const convertModule = (module: Module) => {
    if (module.definition) {
      convertInferenceDefinition(module.definition)
    }
  }

  const convertExportStatement = (exportStatement: ExportStatement) => {

  }

  const convertStartStatement = (startStatement: StartStatement) => {
    const name = getContent(startStatement.module.identifier.word)
    convertModule(startStatement.module)
    starts.push(name)
  }

  const convertBlock = (block: Block): Node[] => {
    return block.list.map(checkStatement)
  }

  const checkStatement = (statement: Statement) => {
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
    return createActionNode(expression)
  }

  const convertIfStatement = (ifStatement: IfStatement): IfTree => {
    const expression = getContent(ifStatement.expression.word)
    const successChildren = convertBlock(ifStatement.ifBlock)
    const faildChildren
      = ifStatement.elseBlock
        ? convertBlock(ifStatement.elseBlock)
        : []
    return createIfTree(expression, successChildren, faildChildren)
  }

  const convertSwitchStatement = (switchStatement: SwitchStatement) => {
    const condition = getContent(switchStatement.expression.word)
    const [children, defaultChild] = convertSwitchBlock(switchStatement.switchBlock)
    return createSwitchTree(condition, children, defaultChild)
  }

  const convertSwitchBlock = (switchBlock: SwitchBlock) => {
    return [
      switchBlock.caseClauses.map(convertCaseClause),
      switchBlock.defaultClause ? convertDefaultClause(switchBlock.defaultClause) : null
    ] as const
  }

  const convertCaseClause = (caseClause: CaseClause) => {
    const expectation = getContent(caseClause.expression.word)
    const children = convertBlock(caseClause.block)
    return createCaseNode(expectation, children)
  }

  const convertDefaultClause = (defaultClause: DefaultClause) => {
    const children = convertBlock(defaultClause.block)
    return createDefaultNode(children)
  }

  const convertGotoStatement = (gotoStatement: GotoStatement) => {
    const name = getContent(gotoStatement.identifier.word)
    return createGotoNode(name)
  }

  convertProgram(program)

  return {
    kind: NodeKind.Tree,
    blocks,
    starts
  }
}

const getContent = (word: string): string => {
  return word.slice(1, word.length - 1)
}