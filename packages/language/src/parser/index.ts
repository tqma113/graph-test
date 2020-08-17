/**
 * 递归下降分析法(recursive-descent parsing)
 * 
 * 预测分析法(prdictive parsing)
 */

import { createLexer, Token, Identifier, Action, Path } from '../lexer'
import { LexicalError } from '../lexer/LexicalError'
import { TokenKind, KeywordEnum, OperatorEnum } from '../lexer/constants'
import { SyntaxError } from './SyntaxError'
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
  createModule
} from './ast'
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
} from './ast'

export * from './ast'
export * from './SyntaxError'

export type BlockType = 'global' | 'local'

export type Parser = {
  program: Program | null,
  tokens: Token[],
  lexcialErrors: LexicalError[],
  syntaxErrors: SyntaxError[],
  parse: () => void
}

export const createParser = (input: string): Parser => {
  const lexer = createLexer(input)

  let token = null as any as Token
  let cache: Token[] = []

  let program: Program | null = null
  let errors: SyntaxError[] = []

  const parse = () => {
    if (program) {
      return
    }

    program = matchProgram()
  }

  const getNextToken = (): Token => {
    while (true) {
      const tok = lexer.next()
      if (tok.kind !== TokenKind.Comment) {
        return tok
      }
    }
  }

  const nextToken = (): Token => {
    if (cache.length > 0) {
      token = cache.shift() as Token
    } else {
      token = getNextToken()
    }
    return token
  }

  const predict = (key: number = 0): Token => {
    if (token && token.kind === TokenKind.EOP) {
      return token
    }
    if (cache.length > key) {
      return cache[key]
    } else {
      const token = getNextToken()
      cache.push(token)
      return token
    }
  }

  /**
   * program
   *  : moduleStatement* EOP
   *  ;
   * 
   * FIRST(program) = { EOP, FIRST(moduleStatement) }
   * FOLLOW(program) = { e }
   */
  const matchProgram = (): Program | null => {
    let moduleStatemens: ModuleStatement[] = []

    while (true) {
      const lookahead = predict()
      if (lookahead.kind !== TokenKind.EOP) {
        const moduleStatement = matchModuleStatement()
        if (moduleStatement === null) {
          recovery()
        } else {
          moduleStatemens.push(moduleStatement)
        }
      } else {
        break
      }
    }

    return createProgram(
      moduleStatemens,
      {
        start: {
          line: 1,
          column: 1
        },
        end: lexer.getPosition()
      }
    )
  }

  /**
   * moduleStatement
   *  : inferenceDefinition
   *  | importStatement
   *  | exportStatement
   *  | startStatement
   *  ;
   * 
   * FIRST(moduleStatement) = { Import, Export, Start, Identifier }
   * FOLLOW(moduleStatement) = { FIRST(moduleStatement), EOF }
   */
  const matchModuleStatement = (): ModuleStatement | null => {
    const lookahead = predict()
    if (lookahead.kind === TokenKind.Keyword) {
      switch (lookahead.word) {
        case KeywordEnum.Import: {
          return matchImportStatement()
        }
        case KeywordEnum.Export: {
          return matchExportStatement()
        }
        case KeywordEnum.Start: {
          return matchStartStatement()
        }
      }
    } else {
      if (lookahead.kind === TokenKind.Identifier) {
        return matchInferenceDefinition()
      }
    }
    reportError(`'${KeywordEnum.Start}', '${KeywordEnum.Export}', '${KeywordEnum.Import}', Identifier: <somethings>`, lookahead)
    return null
  }

  /**
   * inferenceDefinition
   *  : identifier '=' block
   *  ;
   * 
   * FIRST(inferenceDefinition) = { identifier }
   * FOLLOW(inferenceDefinition) = { FOLLOW(moduleStatement), FOLLOW(module) }
   */
  const matchInferenceDefinition = (): InferenceDefinition | null => {
    if (requireIdentifier()) {
      const identifier = token as Identifier
      if (requireOperator(OperatorEnum.Assign)) {
        const block = matchBlock()
        if (block === null) {
          return null
        } else {
          return createInferenceDefinition(
            identifier,
            block,
            {
              start: identifier.range.start,
              end: block.range.end
            }
          )
        }
      } else {
        reportError(OperatorEnum.Assign, token)
        return null
      }
    } else {
      reportError('Identifier: <somethings>', token)
      return null
    }
  }

  /**
   * block
   *  : '{' statement*'}'
   *  ;
   * 
   * FIRST(block) = { OpenBrace }
   * FOLLOW(block) = { FOLLOW(inferenceDefinition), Else, FOLLOW(ifStatement), FOLLOW(caseClause), FOLLOW(defaultClause) }
   */
  const matchBlock = (): Block | null => {
    if (requireOperator(OperatorEnum.OpenBrace)) {
      const start = token.range.start
      let list: Statement[] = []
      while (true) {
        const lookahead = predict()
        if (lookahead.kind === TokenKind.Operator && lookahead.word === OperatorEnum.CloseBrace) {
          nextToken()
          return createBlock(
            list,
            {
              start,
              end: lookahead.range.end
            }
          )
        }

        const statement = matchStatement()
        if (statement === null) {
          recovery()
        } else {
          list.push(statement)
        }
      }
      
    } else {
      reportError(OperatorEnum.OpenBrace, token)
      return null
    }
  }

  /**
   * importStatement
   *  : Import moduleItems From path
   *  ;
   * 
   * FIRST(importStatement) = { Import }
   * FOLLOW(importStatement) = { FOLLOW(moduleStatement) }
   */
  const matchImportStatement = (): ImportStatement | null => {
    if (requireKeyword(KeywordEnum.Import)) {
      const start = token.range.start
      const moduleItems = matchModuleItems()
      if (moduleItems) {
        if (requireKeyword(KeywordEnum.From)) {
          if (requirePath()) {
            const path = token as Path
            return createImportStatement(
              moduleItems,
              path,
              {
                start,
                end: token.range.end
              }
            )
          } else {
            reportError('Path: "somethings"', token)
            return null
          }
        } else {
          reportError(KeywordEnum.From, token)
          return null
        }
      } else {
        return null
      }
    } else {
      reportError(KeywordEnum.Import, token)
      return null
    }
  }

  /**
   * moduleItems
   *  : '{' (identifier ',')* (identifier ','?)? '}'
   *  ;
   * 
   * FIRST(moduleItems) = { OpenBrace }
   * FOLLOW(moduleItems) = { From }
   */
  const matchModuleItems = (): ModuleItems | null => {
    let identifiers: Identifier[] = []
    if (requireOperator(OperatorEnum.OpenBrace)) {
      const start = token.range.start
      if (requireIdentifier()) {
        identifiers.push(token as Identifier)
        while (true) {
          if (requireOperator(OperatorEnum.Comma)) {
            if (requireIdentifier()) {
              identifiers.push(token as Identifier)
            } else if (token.kind === TokenKind.Operator && token.word === OperatorEnum.CloseBrace) {
              return createModuleItems(
                identifiers,
                {
                  start,
                  end: token.range.end
                }
              )
            } else {
              recovery()
              return createModuleItems(
                identifiers,
                {
                  start,
                  end: token.range.end
                }
              )
            }
          } else if (token.kind === TokenKind.Operator && token.word === OperatorEnum.CloseBrace) {
            return createModuleItems(
              identifiers,
              {
                start,
                end: token.range.end
              }
            )
          } else {
            reportError('Identifier: <somethings>', token)
            return null
          }
        }
      } else {
        reportError('Identifier: <somethings>', token)
        return null
      }
    } else {
      reportError(OperatorEnum.OpenBrace, token)
      return null
    }
  }

  /**
   * exportStatement
   *  : Export module
   *  ;
   * 
   * FIRST(exportStatement) = { Export }
   * FOLLOW(exportStatement) = { FOLLOW(moduleStatement) }
   */
  const matchExportStatement = (): ExportStatement | null => {
    if (requireKeyword(KeywordEnum.Export)) {
      const start = token.range.start
      const module = matchModule()
      if (module) {
        return createExportStatement(
          module,
          {
            start,
            end: module.range.end
          }
        )
      } else {
        return null
      }
    } else {
      reportError(KeywordEnum.Export, token)
      return null
    }
  }

  /**
   * startStatement
   *  : Start module
   *  ;
   * 
   * FIRST(startStatement) = { Start }
   * FOLLOW(startStatement) = { FOLLOW(moduleStatement) }
   */
  const matchStartStatement = (): StartStatement | null => {
    if (requireKeyword(KeywordEnum.Start)) {
      const start = token.range.start
      const module = matchModule()
      if (module) {
        return createStartStatement(
          module,
          {
            start,
            end: module.range.end
          }
        )
      } else {
        return null
      }
    } else {
      reportError(KeywordEnum.Start, token)
      return null
    }
  }

  /**
   * module
   * : identifier
   * | inferenceDefinition
   * ;
   * 
   * FIRST(module) = { Identifier }
   * FOLLOW(module) = { FOLLOW(startStatement), FOLLOW(exportStatement) }
   */
  const matchModule = (): Module | null => {
    const lookahead = predict()
    if (lookahead.kind === TokenKind.Identifier) {
      const identifier = lookahead
      const lookahead2 = predict(1)
      if (lookahead2.kind === TokenKind.Operator && lookahead2.word === OperatorEnum.Assign) {
        const definition = matchInferenceDefinition()
        if (definition) {
          return createModule(
            identifier,
            definition,
            definition.range
          )
        } else {
          return createModule(
            identifier,
            null,
            identifier.range
          )
        }
      } else {
        return createModule(
          identifier,
          null,
          identifier.range
        )
      }
    } else {
      reportError('Identifier: <somethings>', token)
      return null
    }
  }

  /**
   * statement
   *  : stepStatement
   *  | ifStatement
   *  | switchStatement
   *  | gotoStatement
   *  ;
   * 
   * FIRST(statement) = { If, Switch, Goto, Action }
   * FOLLOW(statement) = { FIRST(statement), CloseBrace }
   */
  const matchStatement = (): Statement | null => {
    const lookahead = predict()
    if (lookahead.kind === TokenKind.Keyword) {
      switch (lookahead.word) {
        case KeywordEnum.If: {
          return matchIfStatement()
        }
        case KeywordEnum.Switch: {
          return matchSwitchStatement()
        }
        case KeywordEnum.Goto: {
          return matchGotoStatement()
        }
      }
    } else {
      if (lookahead.kind === TokenKind.Action) {
        return matchStepStatement()
      }
    }
    reportError(`'${KeywordEnum.If}', '${KeywordEnum.Switch}', '${KeywordEnum.Goto}', Action: [somethings]`, lookahead)
    return null
  }

  /**
   * stepStatement
   *  : Action
   *  ;
   * 
   * FIRST(stepStatement) = { Action }
   * FOLLOW(stepStatement) = { FOLLOW(statement) }
   */
  const matchStepStatement = (): StepStatement => {
    nextToken()
    const expression = token as Action
    return createStepStatement(
      expression,
      token.range
    )
  }

  /**
   * ifStatement
   *  : If expression '->' block (Else block)?
   *  ;
   * 
   * FRIST(ifStatement) = { If }
   * FOLLOW(ifStatement) = { FOLLOW(statement) }
   */
  const matchIfStatement = (): IfStatement | null => {
    if (requireKeyword(KeywordEnum.If)) {
      const start = token.range.start
      if (requireAction()) {
        const expression = token as Action
        if (requireOperator(OperatorEnum.Result)) {
          let ifBlock = matchBlock()
          if (ifBlock) {
            const lookahead = predict()
            if (lookahead.kind === TokenKind.Keyword && lookahead.word === KeywordEnum.Else) {
              nextToken()
              const elseBlock = matchBlock()
              if (elseBlock) {
                return createIfStatement(
                  expression,
                  ifBlock,
                  elseBlock,
                  {
                    start,
                    end: elseBlock.range.end
                  }
                )
              } else {
                return createIfStatement(
                  expression,
                  ifBlock,
                  null,
                  {
                    start,
                    end: ifBlock.range.end
                  }
                )
              }
            } else {
              return createIfStatement(
                expression,
                ifBlock,
                null,
                {
                  start,
                  end: ifBlock.range.end
                }
              )
            }
          } else {
            return null
          }
        } else {
          reportError(OperatorEnum.Result, token)
          return null
        }
      } else {
        reportError('Action: [somethings]', token)
        return null
      }
    } else {
      reportError(KeywordEnum.If, token)
      return null
    }
  }

  /**
   * switchStatement
   *  : Switch expression switchBlock
   *  ;
   * 
   * FRIST(switchStatement) = { Switch }
   * FOLLOW(switchStatement) = { FOLLOW(statement) }
   */
  const matchSwitchStatement = (): SwitchStatement | null => {
    if (requireKeyword(KeywordEnum.Switch)) {
      const start = token.range.start
      if (requireAction()) {
        const expression = token as Action
        const switchBlock = matchSwitchBlock()
        if (switchBlock) {
          return createSwitchStatement(
            expression,
            switchBlock,
            {
              start,
              end: switchBlock.range.end
            }
          )
        } else {
          return null
        }
      } else {
        reportError('Action: [somethings]', token)
        return null
      }
    } else {
      reportError(KeywordEnum.Switch, token)
      return null
    }
  }

  /**
   * switchBlock
   *  : '{' caseClause* (defaultClause caseClause*)? '}'
   *  ;
   * 
   * FIRST(switchBlock) = { OpenBrace }
   * FOLLOW(switchBlock) = { FOLLOW(switchStatement) }
   */
  const matchSwitchBlock = (): SwitchBlock | null => {
    if (requireOperator(OperatorEnum.OpenBrace)) {
      const start = token.range.start
      let caseClauses: CaseClause[] = []
      let defaultClause: DefaultClause | null = null
      while(true) {
        nextToken()
        if (token.kind === TokenKind.Operator && token.word === OperatorEnum.CloseBrace) {
          return createSwitchBlock(
            caseClauses,
            defaultClause,
            {
              start,
              end: token.range.end
            }
          )
        } else if (token.kind === TokenKind.Keyword && token.word === KeywordEnum.Case) {
          const caseClause = matchCaseClause()
          if (caseClause) {
            caseClauses.push(caseClause)
          }
        } else if (token.kind === TokenKind.Keyword && token.word === KeywordEnum.Default) {
          const dc = matchDefaultClause()
          if (dc) {
            defaultClause = dc
          }
        } else {
          reportError(`'${KeywordEnum.Case}', '${KeywordEnum.Default}', '${OperatorEnum.CloseBrace}'`, token)
          return null
        }
      }
    } else {
      reportError(OperatorEnum.OpenBrace, token)
      return null
    }
  }

  /**
   * caseClause
   *  : Case expression '->' block?
   *  ;
   * 
   * FIRST(caseClause) = { Case }
   * FOLLOW(caseClause) = { FIRST(caseClause), FIRST(defaultClause), CloseBrace }
   */
  const matchCaseClause = (): CaseClause | null => {
    const start = token.range.start
    if (requireAction()) {
      const expression = token as Action
      if (requireOperator(OperatorEnum.Result)) {
        const block = matchBlock()
        if (block) {
          return createCaseClause(
            expression,
            block,
            {
              start,
              end: block.range.end
            }
          )
        } else {
          return null
        }
      } else {
        reportError(OperatorEnum.Result, token)
        return null
      }
    } else {
      reportError('Action: [somethings]', token)
      return null
    }
  }

  /**
   * defaultClause
   *  : Default '->' block?
   *  ;
   * 
   * FIRST(defaultClause) = { Default }
   * FOLLOW(defaultClause) = { FIRST(caseClause), FIRST(defaultClause), CloseBrace }
   */
  const matchDefaultClause = (): DefaultClause | null => {
    const start = token.range.start
    if (requireOperator(OperatorEnum.Result)) {
      const block = matchBlock()
      if (block) {
        return createDefaultClause(
          block,
          {
            start,
            end: block.range.end
          }
        )
      } else {
        return null
      }
    } else {
      reportError(OperatorEnum.Result, token)
      return null
    }
  }

  /**
   * gotoStatement
   *  : Goto identifier
   *  ;
   * 
   * FRIST(gotoStatement) = { Goto }
   * FOLLOW(gotoStatement) = { FOLLOW(statement) }
   */
  const matchGotoStatement = (): GotoStatement | null => {
    if (requireKeyword(KeywordEnum.Goto)) {
      const start = token.range.start
      if (requireIdentifier()) {
        const identifier = token as Identifier
        return createGotoStatement(
          identifier,
          {
            start,
            end: token.range.end
          }
        )
      } else {
        reportError(`Identifier: <somethings>`, token)
        return null
      }
    } else {
      reportError(KeywordEnum.Goto, token)
      return null
    }
  }

  const requirePath = (): boolean => {
    nextToken()
    return token.kind === TokenKind.Path
  }

  const requireAction = (): boolean => {
    nextToken()
    return token.kind === TokenKind.Action
  }

  const requireIdentifier = (): boolean => {
    nextToken()
    return token.kind === TokenKind.Identifier
  }

  const requireKeyword = (keyword: KeywordEnum): boolean => {
    nextToken()
    return token.kind === TokenKind.Keyword && token.word === keyword
  }

  const requireOperator = (operator: OperatorEnum): boolean => {
    nextToken()
    return token.kind === TokenKind.Operator && token.word === operator
  }

  const reportError = (expect: string, token: Token) => {
    errors.push(new SyntaxError(
      `Expect { ${expect} }, accept '${token.word}'`,
      token
    ))
    console.log(errors[errors.length - 1])
  }

  const recovery = () => {
    while (true) {
      nextToken()
      if ((token.kind === TokenKind.Operator && token.word === '}') || token.kind === TokenKind.EOP) {
        break
      }
    }
  }

  return {
    get program() {
      return program
    },
    get tokens() {
      return lexer.tokens
    },
    get lexcialErrors() {
      return lexer.errors
    },
    get syntaxErrors() {
      return errors
    },

    parse
  }
}