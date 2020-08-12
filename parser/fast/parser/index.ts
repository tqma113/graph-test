import { createLexer, Token } from '../lexer'
import { TokenKind, Keyword, Operator } from '../lexer/constants'
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
  Module
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
      if (tok.type !== 'error' && tok.type !== TokenKind.Comment) {
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
    if (token && token.type === TokenKind.EOP) {
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
      if (token.type !== TokenKind.EOP) {
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
    if (token.type === TokenKind.Keyword) {
      switch (token.word) {
        case Keyword.Import: {
          return matchImportStatement()
        }
        case Keyword.Export: {
          return matchExportStatement()
        }
        case Keyword.Start: {
          return matchStartStatement()
        }
      }
    } else {
      if (token.type === TokenKind.Identifier) {
        return matchInferenceDeclaration()
      }
    }
    reportError(`'${Keyword.Start}', '${Keyword.Export}', '${Keyword.Import}', Identifier: <somethings>`, token)
    return null
  }

  /**
   * inferenceDeclaration
   *  : identifier '=' block
   *  ;
   */
  const matchInferenceDeclaration = (): InferenceDeclaration | null => {
    if (requireIdentifier()) {
      const identifier = token
      if (requireOperator(Operator.Assign)) {
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
        reportError(Operator.Assign, token)
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
    if (requireOperator(Operator.OpenBrace)) {
      const start = token.range.start
      let list: Statement[] = []
      while (true) {
        const token = predict()
        if (token.type === TokenKind.Operator && token.word === Operator.CloseBrace) {
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
      reportError(Operator.OpenBrace, token)
      return null
    }
  }

  /**
   * importStatement
   *  : Import moduleItems From path
   *  ;
   */
  const matchImportStatement = (): ImportStatement | null => {
    if (requireKeyword(Keyword.Import)) {
      const start = token.range.start
      const moduleItems = matchModuleItems()
      if (moduleItems) {
        if (requireKeyword(Keyword.From)) {
          if (requirePath()) {
            return createImportStatement(
              moduleItems,
              token,
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
          reportError(Keyword.From, token)
          return null
        }
      } else {
        return null
      }
    } else {
      reportError(Keyword.Import, token)
      return null
    }
  }

  /**
   * moduleItems
   *  : '{' (identifier ',')* (identifier ','?)? '}'
   *  ;
   */
  const matchModuleItems = (): ModuleItems | null => {
    let identifiers: Token[] = []
    if (requireOperator(Operator.OpenBrace)) {
      const start = token.range.start
      if (requireIdentifier()) {
        identifiers.push(token)
        while (true) {
          if (requireOperator(Operator.Comma)) {
            if (requireIdentifier()) {
              identifiers.push(token)
            } else if (token.type === TokenKind.Operator && token.word === Operator.CloseBrace) {
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
          } else if (token.type === TokenKind.Operator && token.word === Operator.CloseBrace) {
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
      reportError(Operator.OpenBrace, token)
      return null
    }
  }

  /**
   * exportStatement
   *  : Export module
   *  ;
   */
  const matchExportStatement = (): ExportStatement | null => {
    if (requireKeyword(Keyword.Export)) {
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
      reportError(Keyword.Export, token)
      return null
    }
  }

  /**
   * startStatement
   *  : Start module
   *  ;
   */
  const matchStartStatement = (): StartStatement | null => {
    if (requireKeyword(Keyword.Start)) {
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
      reportError(Keyword.Start, token)
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
    if (nt.type === TokenKind.Identifier) {
      const identifier = nt
      const nt2 = predict(1)
      if (nt2.type === TokenKind.Operator && nt2.word === Operator.Assign) {
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
    if (token.type === TokenKind.Keyword) {
      switch (token.word) {
        case Keyword.If: {
          return matchIfStatement()
        }
        case Keyword.Switch: {
          return matchSwitchStatement()
        }
        case Keyword.Goto: {
          return matchGotoStatement()
        }
      }
    } else {
      if (token.type === TokenKind.Action) {
        return matchStepStatement()
      }
    }
    reportError(`'${Keyword.If}', '${Keyword.Switch}', '${Keyword.Goto}', Action: [somethings]`, token)
    return null
  }

  /**
   * stepStatement
   *  : Action
   *  ;
   */
  const matchStepStatement = (): StepStatement => {
    nextToken()
    return createStepStatement(
      token,
      token.range
    )
  }

  /**
   * ifStatement
   *  : If expression '->' block (Else block)?
   *  ;
   */
  const matchIfStatement = (): IfStatement | null => {
    if (requireKeyword(Keyword.If)) {
      const start = token.range.start
      if (requireAction()) {
        const expression = token
        if (requireOperator(Operator.Result)) {
          let ifBlock = matchBlock()
          if (ifBlock) {
            const nt = predict()
            if (nt.type === TokenKind.Keyword && nt.word === Keyword.Else) {
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
          reportError(Operator.Result, token)
          return null
        }
      } else {
        reportError('Action: [somethings]', token)
        return null
      }
    } else {
      reportError(Keyword.If, token)
      return null
    }
  }

  /**
   * switchStatement
   *  : Switch expression switchBlock
   *  ;
   */
  const matchSwitchStatement = (): SwitchStatement | null => {
    if (requireKeyword(Keyword.Switch)) {
      const start = token.range.start
      if (requireAction()) {
        const expression = token
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
      reportError(Keyword.Switch, token)
      return null
    }
  }

  /**
   * switchBlock
   *  : '{' caseClause* (defaultClause caseClause*)? '}'
   *  ;
   */
  const matchSwitchBlock = (): SwitchBlock | null => {
    if (requireOperator(Operator.OpenBrace)) {
      const start = token.range.start
      let caseClauses: CaseClause[] = []
      let defaultClause: DefaultClause | null = null
      while(true) {
        nextToken()
        if (token.type === TokenKind.Operator && token.word === Operator.CloseBrace) {
          return createSwitchBlock(
            caseClauses,
            defaultClause,
            {
              start,
              end: token.range.end
            }
          )
        } else if (token.type === TokenKind.Keyword && token.word === Keyword.Case) {
          const caseClause = matchCaseClause()
          if (caseClause) {
            caseClauses.push(caseClause)
          }
        } else if (token.type === TokenKind.Keyword && token.word === Keyword.Default) {
          const dc = matchDefaultClause()
          if (dc) {
            defaultClause = dc
          }
        } else {
          reportError(`'${Keyword.Case}', '${Keyword.Default}', '${Operator.CloseBrace}'`, token)
          return null
        }
      }
    } else {
      reportError(Operator.OpenBrace, token)
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
      const expression = token
      if (requireOperator(Operator.Result)) {
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
        reportError(Operator.Result, token)
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
    if (requireOperator(Operator.Result)) {
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
      reportError(Operator.Result, token)
      return null
    }
  }

  /**
   * gotoStatement
   *  : Goto identifier
   *  ;
   */
  const matchGotoStatement = (): GotoStatement | null => {
    if (requireKeyword(Keyword.Goto)) {
      const start = token.range.start
      if (requireIdentifier()) {
        return createGotoStatement(
          token,
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
      reportError(Keyword.Goto, token)
      return null
    }
  }

  const requirePath = (): boolean => {
    nextToken()
    return token.type === TokenKind.Path
  }

  const requireAction = (): boolean => {
    nextToken()
    return token.type === TokenKind.Action
  }

  const requireIdentifier = (): boolean => {
    nextToken()
    return token.type === TokenKind.Identifier
  }

  const requireKeyword = (keyword: Keyword): boolean => {
    nextToken()
    return token.type === TokenKind.Keyword && token.word === keyword
  }

  const requireOperator = (operator: Operator): boolean => {
    nextToken()
    return token.type === TokenKind.Operator && token.word === operator
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
      if ((token.type === TokenKind.Operator && token.word === '}') || token.type === TokenKind.EOP) {
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