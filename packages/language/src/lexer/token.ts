import {
  TokenKind,
  OperatorEnum,
  KeywordEnum
} from './constants'
import type { Range } from '../index'

export type Keyword = {
  kind: TokenKind.Keyword
  word: KeywordEnum
  range: Range
}

export const createKeyword = (
  word: KeywordEnum,
  range: Range
): Keyword => {
  return {
    kind: TokenKind.Keyword,
    word,
    range
  }
}

export type Operator = {
  kind: TokenKind.Operator
  word: OperatorEnum
  range: Range
}

export const createOperator = (
  word: OperatorEnum,
  range: Range
): Operator => {
  return {
    kind: TokenKind.Operator,
    word,
    range
  }
}

export type Identifier = {
  kind: TokenKind.Identifier
  word: string
  range: Range
}

export const createIdentifier = (
  word: string,
  range: Range
): Identifier => {
  return {
    kind: TokenKind.Identifier,
    word,
    range
  }
}

export type Action = {
  kind: TokenKind.Action
  word: string
  range: Range
}

export const createAction = (
  word: string,
  range: Range
): Action => {
  return {
    kind: TokenKind.Action,
    word,
    range
  }
}

export type Path = {
  kind: TokenKind.Path
  word: string
  range: Range
}

export const createPath = (
  word: string,
  range: Range
): Path => {
  return {
    kind: TokenKind.Path,
    word,
    range
  }
}

export type Comment = {
  kind: TokenKind.Comment
  word: string
  range: Range
}

export const createComment = (
  word: string,
  range: Range
): Comment => {
  return {
    kind: TokenKind.Comment,
    word,
    range
  }
}

export type EOP = {
  kind: TokenKind.EOP
  word: null
  range: Range
}

export const createEOP = (
  range: Range
): EOP => {
  return {
    kind: TokenKind.EOP,
    word: null,
    range
  }
}

export type Token =
  | Keyword
  | Operator
  | Identifier
  | Action
  | Path
  | Comment
  | EOP