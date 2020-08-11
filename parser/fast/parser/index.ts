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
  createModuleItems
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
  ModuleItems
} from './ast'

export type BlockType = 'global' | 'local'

export const createParser = (input: string) => {
  const lexer = createLexer(input)

  let token = null as any as Token

  let program: Program | null = null
  let errors: SyntaxError[] = []
  let blockStack: BlockType[] = ['global']

  const parse = () => {
    if (program) {
      return
    }

    program = matchProgram()
  }

  const nextToken = (): Token => {
    while (true) {
      let tok = lexer.nextToken()
      if (tok.type !== 'error' && tok.type !== TokenKind.Comment) {
        if (tok.word === '{') {
          blockStack.push('local')
        }
        if (tok.word === '}') {
          blockStack.pop()
        }

        token = tok
        return token
      }
    }
  }

  const matchProgram = (): Program | null => {
    nextToken()
    let start = token.range.start
    let moduleStatemens: ModuleStatement[] = []

    while (true) {
      if (token.type !== TokenKind.EOP) {
        const moduleStatement = matchModuleStatement()
        if (moduleStatement === null) {
          recovery()
        } else {
          moduleStatemens.push(moduleStatement)
        }
        nextToken()
      } else {
        break
      }
    }

    return createProgram(
      moduleStatemens,
      {
        start,
        end: token.range.end
      }
    )
  }

  const matchModuleStatement = (): ModuleStatement | null => {
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
    addError(`'${Keyword.Start}', '${Keyword.Export}', '${Keyword.Import}', Identifier: <somethings>`, token)
    return null
  }

  const matchInferenceDeclaration = (): InferenceDeclaration | null => {
    let identifier = token
    if (matchOperator(Operator.Assign)) {
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
      addError(Operator.Assign, token)
      return null
    }
  }

  const matchBlock = (): Block | null => {
    if (matchOperator(Operator.OpenBrace)) {
      let start = token.range.start
      let list: Statement[] = []
      while (true) {
        if (token.type === TokenKind.Operator && token.word === Operator.CloseBrace) {
          break
        }

        const statement = matchStatement()
        if (statement === null) {
          recovery()
        } else {
          list.push(statement)
        }
      }
      return createBlock(
        list,
        {
          start,
          end: token.range.end
        }
      )
    } else {
      addError(Operator.OpenBrace, token)
      return null
    }
  }

  const matchImportStatement = (): ImportStatement | null => {
    let start = token.range.start
    let moduleItems = matchModuleItems()
    if (moduleItems) {
      if (matchKeyword(Keyword.From)) {
        if (matchPath()) {
          return createImportStatement(
            moduleItems,
            token,
            {
              start,
              end: token.range.end
            }
          )
        } else {
          addError('Path: "somethings"', token)
          return null
        }
      } else {
        addError(Keyword.From, token)
        return null
      }
    } else {
      return null
    }
  }

  const matchModuleItems = (): ModuleItems | null => {
    let identifiers: Token[] = []
    if (matchOperator(Operator.OpenBrace)) {
      let start = token.range.start
      if (matchIdentifier()) {
        identifiers.push(token)
        while (true) {
          if (matchOperator(Operator.Comma)) {
            if (matchIdentifier()) {
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
            addError('Identifier: <somethings>', token)
            return null
          }
        }
      } else {
        addError('Identifier: <somethings>', token)
        return null
      }
    } else {
      addError(Operator.OpenBrace, token)
      return null
    }
  }

  const matchExportStatement = (): ExportStatement | null => {
    if (matchIdentifier()) {
      return createExportStatement(
        token,
        token.range
      )
    } else {
      addError('Identifier: <somethings>', token)
      return null
    }
  }

  const matchStartStatement = (): StartStatement | null => {
    if (matchIdentifier()) {
      return createStartStatement(
        token,
        token.range
      )
    } else {
      addError('Identifier: <somethings>', token)
      return null
    }
  }

  const matchStatement = (): Statement | null => {
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
    addError(`'${Keyword.If}', '${Keyword.Switch}', '${Keyword.Goto}', Action: [somethings]`, token)
    return null
  }

  const matchStepStatement = (): StepStatement => {
    return createStepStatement(
      token,
      token.range
    )
  }

  const matchIfStatement = (): IfStatement | null => {
    const start = token.range.start
    if (matchAction()) {
      const expression = token
      if (matchOperator(Operator.Result)) {
        let ifBlock = matchBlock()
        if (ifBlock) {
          if (matchKeyword(Keyword.Else)) {
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
        addError(Operator.Result, token)
        return null
      }
    } else {
      addError('Action: [somethings]', token)
      return null
    }
  }

  const matchSwitchStatement = (): SwitchStatement | null => {
    const start = token.range.start
    if (matchAction()) {
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
      addError('Action: [somethings]', token)
      return null
    }
  }

  const matchSwitchBlock = (): SwitchBlock | null => {
    if (matchOperator(Operator.OpenBrace)) {
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
          addError(`'${Keyword.Case}', '${Keyword.Default}', '${Operator.CloseBrace}'`, token)
          return null
        }
      }
    } else {
      addError(Operator.OpenBrace, token)
      return null
    }
  }

  const matchCaseClause = (): CaseClause | null => {
    const start = token.range.start
    if (matchAction()) {
      const expression = token
      if (matchOperator(Operator.Result)) {
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
        addError(Operator.Result, token)
        return null
      }
    } else {
      addError('Action: [somethings]', token)
      return null
    }
  }

  const matchDefaultClause = (): DefaultClause | null => {
    const start = token.range.start
    if (matchOperator(Operator.Result)) {
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
      addError(Operator.Result, token)
      return null
    }
  }

  const matchGotoStatement = (): GotoStatement | null => {
    const start = token.range.start
    if (matchIdentifier()) {
      return createGotoStatement(
        token,
        {
          start,
          end: token.range.end
        }
      )
    } else {
      addError(`Identifier: <somethings>`, token)
      return null
    }
  }

  const matchPath = (): boolean => {
    nextToken()
    return token.type === TokenKind.Path
  }

  const matchAction = (): boolean => {
    nextToken()
    return token.type === TokenKind.Action
  }

  const matchIdentifier = (): boolean => {
    nextToken()
    return token.type === TokenKind.Identifier
  }

  const matchKeyword = (keyword: Keyword): boolean => {
    nextToken()
    return token.type === TokenKind.Keyword && token.word === keyword
  }

  const matchOperator = (operator: Operator): boolean => {
    nextToken()
    return token.type === TokenKind.Operator && token.word === operator
  }

  const addError = (expect: string, token: Token) => {
    errors.push(new SyntaxError(
      `Expect { ${expect} }, accept '${token.word}'`,
      token
    ))
  }

  const recovery = () => {
    while (true) {
      nextToken()
      if (token.type === TokenKind.Operator && token.word === '}') {
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