import { SymbolChar, TokenKind, OperatorEnum, KeywordEnum } from './constants'
import { LexicalError } from './LexicalError'
import {
  isLetter,
  isValidContentChar,
  isNewLineChar,
  isWhitespace,
  isKeyword
} from './util'
import type { Range, Position } from '../index'

export type Keyword = {
  kind: TokenKind.Keyword,
  word: KeywordEnum,
  range: Range
}

export type Operator = {
  kind: TokenKind.Operator,
  word: OperatorEnum,
  range: Range
}

export type Identifier = {
  kind: TokenKind.Identifier,
  word: string,
  range: Range
}

export type Action = {
  kind: TokenKind.Action,
  word: string,
  range: Range
}

export type Path = {
  kind: TokenKind.Path,
  word: string,
  range: Range
}

export type Comment = {
  kind: TokenKind.Comment,
  word: string,
  range: Range
}

export type EOP = {
  kind: TokenKind.EOP,
  word: null,
  range: Range
}

export type Token = Keyword | Operator | Identifier | Action | Path | Comment | EOP

export type Lexer = {
  tokens: Token[]
  errors: LexicalError[]
  nextToken: () => Token | LexicalError
  run: () => void
}

export const createLexer = (input: string): Lexer => {
  let offset = 0
  let forward = 0
  let line = 1
  let column = 1


  let tokens: Token[] = []
  let errors: LexicalError[] = []

  const run = () => {
    while (!isEoP()) {
      const result = nextToken()
      if (result.kind === 'error') {
        errors.push(result)
      } else {
        tokens.push(result)
      }
    }
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

  const consumeWhitespace = (): Token | null => {
    while (true) {
      const char = getCurrentChar()
      if (isEoP()) {
        return {
          kind: TokenKind.EOP,
          word: null,
          range: getRange()
        }
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

  const matchComment = (): Token | LexicalError => {
    while (!isEoP() && !isNewLineChar(nextChar()));

    const word = getCurrentWord()
    const range = getRange()

    endWord()

    return {
      kind: TokenKind.Comment,
      word,
      range
    }
  }

  const matchIdentifier = (): Token | LexicalError => {
    let char: string
    while (true) {
      char = nextChar()
      if (char === SymbolChar.CloseAngleBracket) {
        nextChar()
        const word = getCurrentWord()
        const range = getRange()

        endWord()

        return {
          kind: TokenKind.Identifier,
          word,
          range
        }
      }
      if (isEoP() || !isValidContentChar(char)) {
        const word = getCurrentWord()
        return new LexicalError(
          `Identifier: ${word} has not been closed`,
          getPosition()
        )
      }
    }
  }

  const matchAction = (): Token | LexicalError => {
    let char: string
    while (true) {
      char = nextChar()
      if (char === SymbolChar.CloseBracket) {
        nextChar()
        const word = getCurrentWord()
        const range = getRange()
        endWord()

        return {
          kind: TokenKind.Action,
          word,
          range
        }
      }
      if (isEoP() || !isValidContentChar(char)) {
        const word = getCurrentWord()
        return new LexicalError(
          `Action: ${word} has not been closed`,
          getPosition()
        )
      }
    }
  }

  const matchPath = (): Token | LexicalError => {
    let char: string
    while (true) {
      char = nextChar()
      if (char === SymbolChar.Quote) {
        nextChar()
        const word = getCurrentWord()
        const range = getRange()
        endWord()

        return {
          kind: TokenKind.Path,
          word,
          range
        }
      }
      if (isEoP() || !isValidContentChar(char)) {
        const word = getCurrentWord()
        return new LexicalError(
          `Path: ${word} has not been closed`,
          getPosition()
        )
      }
    }
  }
  
  const matchKeyword = (): Token | LexicalError => {
    let char: string
    while (true) {
      char = nextChar()
      if (isEoP() || !isLetter(char)) {
        const word = getCurrentWord()
        if (isKeyword(word)) {
          const range = getRange()
          endWord()
  
          return {
            kind: TokenKind.Keyword,
            word: word as KeywordEnum,
            range
          }
        } else {
          return new LexicalError(
            `Unknown token: ${word}`,
            getPosition()
          )
        }
      }
    }
  }

  const matchOperator = (): Token | LexicalError => {
    const char = getCurrentChar()
    switch (char) {
      case OperatorEnum.OpenBrace: {
        nextChar()
        const range = getRange()
        endWord()

        return {
          kind: TokenKind.Operator,
          word: OperatorEnum.OpenBrace,
          range
        }
      }
      case OperatorEnum.CloseBrace: {
        nextChar()
        const range = getRange()
        endWord()

        return {
          kind: TokenKind.Operator,
          word: OperatorEnum.CloseBrace,
          range
        }
      }
      case OperatorEnum.Assign: {
        nextChar()
        const range = getRange()
        endWord()

        return {
          kind: TokenKind.Operator,
          word: OperatorEnum.Assign,
          range
        }
      }
      case OperatorEnum.Result[0]: {
        const nc = nextChar()
        if (nc === OperatorEnum.Result[1]) {
          nextChar()
          const range = getRange()
          endWord()

          return {
            kind: TokenKind.Operator,
            word: OperatorEnum.Result,
            range
          }
        } else {
          nextChar()
          const word = getCurrentWord()
          return new LexicalError(
            `Unknown token: ${word}`,
            getPosition()
          )
        }
      }
      case OperatorEnum.Comma: {
        nextChar()
        const range = getRange()
        endWord()

        return {
          kind: TokenKind.Operator,
          word: OperatorEnum.Comma,
          range
        }
      }
      default: {
        nextChar()
        return new LexicalError(
          `Unknown token: ${char}`,
          getPosition()
        )
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
      column
    }
  }

  const getRange = (): Range => {
    const length = forward - offset
    return {
      start: {
        line,
        column: column - length - 1
      },
      end: {
        line,
        column: column - 1
      }
    }
  }

  const isEoP = () => {
    return forward >= input.length
  }

  return {
    get tokens() {
      return tokens
    },
    get errors() {
      return errors
    },

    nextToken,
    run
  }
}