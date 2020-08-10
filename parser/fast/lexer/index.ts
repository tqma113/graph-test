import { isLetter, isValidContentChar, isNewLineChar, isWhitespace, isKeyword } from './util'
import { SymbolChar, TokenType, Operator } from './constants'
import { SyntaxError } from './SyntaxError'
import type { Range, Position } from '../index'

export type Token = {
  type: TokenType,
  word: string,
  range: Range
}

export type Lexer = {
  tokens: Token[]
  errors: SyntaxError[]
  nextToken: () => Token | SyntaxError
  run: () => void
}

export const createLexer = (input: string): Lexer => {
  let offset = 0
  let forward = 0
  let line = 1
  let column = 1


  let tokens: Token[] = []
  let errors: SyntaxError[] = []

  const run = () => {
    while (!isEoP()) {
      const result = nextToken()
      console.log(result)
      if (result instanceof SyntaxError) {
        errors.push(result)
      } else {
        tokens.push(result)
      }
    }
  }

  const nextToken = (): Token | SyntaxError => {
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
          type: TokenType.EOP,
          word: char,
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

      break
    }
    return null
  }

  const matchComment = (): Token | SyntaxError => {
    while (!isEoP() && !isNewLineChar(nextChar()));

    const comment = getCurrentWord()
    const token = {
      type: TokenType.Comment,
      word: comment,
      range: getRange()
    }

    endWord()

    return token
  }

  const matchIdentifier = (): Token | SyntaxError => {
    let char: string
    while (true) {
      char = nextChar()
      if (char === SymbolChar.CloseAngleBracket) {
        nextChar()
        const word = getCurrentWord()
        const token = {
          type: TokenType.Identifier,
          word,
          range: getRange()
        }

        endWord()

        return token
      }
      if (isEoP() || !isValidContentChar(char)) {
        const word = getCurrentWord()
        return new SyntaxError(
          `Identifier: ${word} has not been closed`,
          getPosition()
        )
      }
    }
  }

  const matchAction = (): Token | SyntaxError => {
    let char: string
    while (true) {
      char = nextChar()
      if (char === SymbolChar.CloseBracket) {
        nextChar()
        const word = getCurrentWord()
        const token = {
          type: TokenType.Action,
          word,
          range: getRange()
        }

        endWord()

        return token
      }
      if (isEoP() || !isValidContentChar(char)) {
        const word = getCurrentWord()
        return new SyntaxError(
          `Action: ${word} has not been closed`,
          getPosition()
        )
      }
    }
  }

  const matchPath = (): Token | SyntaxError => {
    let char: string
    while (true) {
      char = nextChar()
      if (char === SymbolChar.Quote) {
        nextChar()
        const word = getCurrentWord()
        const token = {
          type: TokenType.Path,
          word,
          range: getRange()
        }

        endWord()

        return token
      }
      if (isEoP() || !isValidContentChar(char)) {
        const word = getCurrentWord()
        return new SyntaxError(
          `Path: ${word} has not been closed`,
          getPosition()
        )
      }
    }
  }
  
  const matchKeyword = (): Token | SyntaxError => {
    let char: string
    while (true) {
      char = nextChar()
      if (isEoP() || !isLetter(char)) {
        const word = getCurrentWord()
        if (isKeyword(word)) {
          const token = {
            type: TokenType.Keyword,
            word,
            range: getRange()
          }
  
          endWord()
  
          return token
        } else {
          return new SyntaxError(
            `Unknown token: ${word}`,
            getPosition()
          )
        }
      }
    }
  }

  const matchOperator = (): Token | SyntaxError => {
    const char = getCurrentChar()
    switch (char) {
      case Operator.OpenBrace: {
        nextChar()

        const token = {
          type: TokenType.Operator,
          word: Operator.OpenBrace,
          range: getRange()
        }

        endWord()

        return token
      }
      case Operator.CloseBrace: {
        nextChar()

        const token = {
          type: TokenType.Operator,
          word: Operator.CloseBrace,
          range: getRange()
        }

        endWord()

        return token
      }
      case Operator.Assign: {
        nextChar()

        const token = {
          type: TokenType.Operator,
          word: Operator.Assign,
          range: getRange()
        }

        endWord()

        return token
      }
      case Operator.Result[0]: {
        const nc = nextChar()
        if (nc === Operator.Result[1]) {
          nextChar()

          const token = {
            type: TokenType.Operator,
            word: Operator.Result,
            range: getRange()
          }

          endWord()

          return token
        } else {
          const word = getCurrentWord()
          return new SyntaxError(
            `Unknown token: ${word}`,
            getPosition()
          )
        }
      }
      case Operator.Comma: {
        nextChar()

        const token = {
          type: TokenType.Operator,
          word: Operator.Comma,
          range: getRange()
        }

        endWord()

        return token
      }
      default: {
        return new SyntaxError(
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
        column: column - length
      },
      end: {
        line,
        column
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