/**
 * Lexer
 *
 * Transit source code to tokens.
 */

import { LexicalError } from './LexicalError'
import {
  isLetter,
  isValidActionChar,
  isValidIdentifierChar,
  isValidPathChar,
  isNewLineChar,
  isWhitespace,
  isKeyword,
} from './validate'
import {
  SymbolChar,
  TokenKind,
  OperatorEnum,
  createKeyword,
  createOperator,
  createIdentifier,
  createComment,
  createAction,
  createPath,
  createEOP,
} from './token'
import type {
  Token,
  Keyword,
  Operator,
  Identifier,
  Action,
  Path,
  Comment,
  EOP,
} from './token'
import type { Range, Position } from '../index'

export * from './token'
export * from './LexicalError'

export interface Lexer {
  tokens: Token[]
  lexicalErrors: LexicalError[]
  getPosition: () => Position
  run: () => Token[]
  next: () => IteratorResult<Token, EOP>
}

export const createLexer = (input: string): Lexer => {
  let offset = 0
  let forward = 0
  let line = 1
  let column = 1

  let tokens: Token[] = []
  let lexicalErrors: LexicalError[] = []

  const run = () => {
    while (!isEoP()) {
      const result = nextToken()
      if (result.kind === 'error') {
        lexicalErrors.push(result)
      } else {
        tokens.push(result)
      }
    }
    if (
      tokens.length === 0 ||
      tokens[tokens.length - 1].kind !== TokenKind.EOP
    ) {
      tokens.push(createEOP(getRange()))
    }
    return tokens
  }

  const nextToken = (): Token | LexicalError => {
    const result = consumeWhitespace()
    if (result) {
      return result
    }

    const char = getCurrentChar()
    switch (char) {
      case SymbolChar.Well: {
        return matchComment()
      }
      case SymbolChar.OpenAngleBracket: {
        return matchIdentifier()
      }
      case SymbolChar.OpenBracket: {
        return matchAction()
      }
      case SymbolChar.Quote: {
        return matchPath()
      }
      default: {
        if (isLetter(char)) {
          return matchKeyword()
        } else {
          return matchOperator()
        }
      }
    }
  }

  const consumeWhitespace = (): EOP | null => {
    while (true) {
      const char = getCurrentChar()
      if (isEoP()) {
        return createEOP(getRange())
      }
      if (isWhitespace(char)) {
        if (isNewLineChar(char)) {
          nextLine()
        }
        nextChar()
        continue
      }

      endWord()

      return null
    }
  }

  const matchComment = (): Comment | LexicalError => {
    while (!isEoP() && !isNewLineChar(nextChar()));

    const word = getCurrentWord()
    const range = getRange()

    endWord()

    return createComment(word, range)
  }

  const matchIdentifier = (): Identifier | LexicalError => {
    let char: string
    while (true) {
      char = nextChar()
      if (char === SymbolChar.CloseAngleBracket) {
        nextChar()
        const word = getCurrentWord()
        const range = getRange()

        endWord()

        return createIdentifier(word, range)
      }
      if (isEoP() || !isValidIdentifierChar(char)) {
        const word = getCurrentWord()
        return new LexicalError(
          `Identifier: ${word} has not been closed`,
          getPosition()
        )
      }
    }
  }

  const matchAction = (): Action | LexicalError => {
    let char: string
    while (true) {
      char = nextChar()
      if (char === SymbolChar.CloseBracket) {
        nextChar()
        const word = getCurrentWord()
        const range = getRange()
        endWord()

        return createAction(word, range)
      }
      if (isEoP() || !isValidActionChar(char)) {
        const word = getCurrentWord()
        return new LexicalError(
          `Action: ${word} has not been closed`,
          getPosition()
        )
      }
    }
  }

  const matchPath = (): Path | LexicalError => {
    let char: string
    while (true) {
      char = nextChar()
      if (char === SymbolChar.Quote) {
        nextChar()
        const word = getCurrentWord()
        const range = getRange()
        endWord()

        return createPath(word, range)
      }
      if (isEoP() || !isValidPathChar(char)) {
        const word = getCurrentWord()
        return new LexicalError(
          `Path: ${word} has not been closed`,
          getPosition()
        )
      }
    }
  }

  const matchKeyword = (): Keyword | LexicalError => {
    let char: string
    while (true) {
      char = nextChar()
      if (isEoP() || !isLetter(char)) {
        const word = getCurrentWord()
        if (isKeyword(word)) {
          const range = getRange()
          endWord()

          return createKeyword(word, range)
        } else {
          return new LexicalError(`Unknown token: ${word}`, getPosition())
        }
      }
    }
  }

  const matchOperator = (): Operator | LexicalError => {
    const char = getCurrentChar()
    switch (char) {
      case OperatorEnum.OpenBrace: {
        nextChar()
        const range = getRange()
        endWord()

        return createOperator(OperatorEnum.OpenBrace, range)
      }
      case OperatorEnum.CloseBrace: {
        nextChar()
        const range = getRange()
        endWord()

        return createOperator(OperatorEnum.CloseBrace, range)
      }
      case OperatorEnum.Assign: {
        nextChar()
        const range = getRange()
        endWord()

        return createOperator(OperatorEnum.Assign, range)
      }
      case OperatorEnum.Result[0]: {
        const nc = nextChar()
        if (nc === OperatorEnum.Result[1]) {
          nextChar()
          const range = getRange()
          endWord()

          return createOperator(OperatorEnum.Result, range)
        } else {
          nextChar()
          const word = getCurrentWord()
          return new LexicalError(`Unknown token: ${word}`, getPosition())
        }
      }
      case OperatorEnum.Comma: {
        nextChar()
        const range = getRange()
        endWord()

        return createOperator(OperatorEnum.Comma, range)
      }
      default: {
        nextChar()
        return new LexicalError(`Unknown token: ${char}`, getPosition())
      }
    }
  }

  const nextChar = () => {
    forward++
    column++
    return input[forward]
  }

  const nextLine = () => {
    line++
    column = 1
  }

  const endWord = () => {
    offset = forward
    forward = offset
  }

  const getCurrentWord = (): string => {
    return input.slice(offset, forward)
  }

  const getCurrentChar = (): string => {
    return input[forward] || ''
  }

  const getPosition = (): Position => {
    return {
      line,
      column,
    }
  }

  const getRange = (): Range => {
    const length = forward - offset
    return {
      start: {
        line,
        column: column - length - 1,
      },
      end: {
        line,
        column: column - 1,
      },
    }
  }

  const isEoP = () => {
    return forward >= input.length
  }

  return {
    get tokens() {
      return tokens
    },
    get lexicalErrors() {
      return lexicalErrors
    },

    getPosition,
    next: () => {
      if (isEoP() && tokens.length > 0) {
        let lastestToken = tokens[tokens.length - 1]
        if (lastestToken.kind !== TokenKind.EOP) {
          lastestToken = createEOP(getRange())
          tokens.push(lastestToken)
        }
        return {
          value: lastestToken,
          done: true as const,
        }
      }

      let result = nextToken()
      while (true) {
        if (result.kind === 'error') {
          lexicalErrors.push(result)
        } else {
          tokens.push(result)
          break
        }
        result = nextToken()
      }
      return {
        value: result,
        done: false as const,
      }
    },
    run,
  }
}
