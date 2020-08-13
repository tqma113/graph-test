import { createLexer, Token, Identifier, Action, Path } from '../lexer'
import { TokenKind, KeywordEnum, OperatorEnum } from '../lexer/constants'
import { SyntaxError } from './SyntaxError'
import {
  createProgram,
  createInferenceDeclaration,
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
  InferenceDeclaration,
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

export type BlockType = 'global' | 'local'

export const createParser = (input: string) => {
  const lexer = createLexer(input)

  let token = null as any as Token
  let cache: Token[] = []

  let program: Program | null = null
  let errors: SyntaxError[] = []
  let blockStack: BlockType[] = ['global']

  const parse = () => {
    if (program) {
      return
    }

    program = matchProgram()
  }

  const getNextToken = (): Token => {
    while (true) {
      let tok = lexer.nextToken()
      if (tok.kind !== 'error' && tok.kind !== TokenKind.Comment) {
        if (tok.word === '{') {
          blockStack.push('local')
        }
        if (tok.word === '}') {
          blockStack.pop()
        }

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
   */
  const matchProgram = (): Program | null => {
    let moduleStatemens: ModuleStatement[] = []

    while (true) {
      const token = predict()
      if (token.kind !== TokenKind.EOP) {
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
        end: token.range.end
      }
    )
  }

  /**
   * moduleStatement
   *  : inferenceDeclaration
   *  | importStatement
   *  | exportStatement
   *  | startStatement
   *  ;
   */
  const matchModuleStatement = (): ModuleStatement | null => {
    const token = predict()
    if (token.kind === TokenKind.Keyword) {
      switch (token.word) {
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
      if (token.kind === TokenKind.Identifier) {
        return matchInferenceDeclaration()
      }
    }
    reportError(`'${KeywordEnum.Start}', '${KeywordEnum.Export}', '${KeywordEnum.Import}', Identifier: <somethings>`, token)
    return null
  }

  /**
   * inferenceDeclaration
   *  : identifier '=' block
   *  ;
   */
  const matchInferenceDeclaration = (): InferenceDeclaration | null => {
    if (requireIdentifier()) {
      const identifier = token as Identifier
      if (requireOperator(OperatorEnum.Assign)) {
        const block = matchBlock()
        if (block === null) {
          return null
        } else {
          return createInferenceDeclaration(
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
   */
  const matchBlock = (): Block | null => {
    if (requireOperator(OperatorEnum.OpenBrace)) {
      const start = token.range.start
      let list: Statement[] = []
      while (true) {
        const token = predict()
        if (token.kind === TokenKind.Operator && token.word === OperatorEnum.CloseBrace) {
          nextToken()
          return createBlock(
            list,
            {
              start,
              end: token.range.end
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
   * | inferenceDeclaration
   * ;
   */
  const matchModule = (): Module | null => {
    const nt = predict()
    if (nt.kind === TokenKind.Identifier) {
      const identifier = nt
      const nt2 = predict(1)
      if (nt2.kind === TokenKind.Operator && nt2.word === OperatorEnum.Assign) {
        const declaration = matchInferenceDeclaration()
        if (declaration) {
          return createModule(
            identifier,
            declaration,
            declaration.range
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
   */
  const matchStatement = (): Statement | null => {
    const token = predict()
    if (token.kind === TokenKind.Keyword) {
      switch (token.word) {
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
      if (token.kind === TokenKind.Action) {
        return matchStepStatement()
      }
    }
    reportError(`'${KeywordEnum.If}', '${KeywordEnum.Switch}', '${KeywordEnum.Goto}', Action: [somethings]`, token)
    return null
  }

  /**
   * stepStatement
   *  : Action
   *  ;
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
   */
  const matchIfStatement = (): IfStatement | null => {
    if (requireKeyword(KeywordEnum.If)) {
      const start = token.range.start
      if (requireAction()) {
        const expression = token as Action
        if (requireOperator(OperatorEnum.Result)) {
          let ifBlock = matchBlock()
          if (ifBlock) {
            const nt = predict()
            if (nt.kind === TokenKind.Keyword && nt.word === KeywordEnum.Else) {
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
      console.trace(token)
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