import type { Range } from '../index'

// prettier-ignore
export enum SymbolChar {
  OpenBrace             =         '{',
  CloseBrace            =         '}',
  OpenBracket           =         '[',
  CloseBracket          =         ']',
  OpenAngleBracket      =         '<',
  CloseAngleBracket     =         '>',
  Assign                =         '=',
  Result                =         '->',
  Comma                 =         ',',
  Quote                 =         '"',
  Well                  =         '#'
}

// prettier-ignore
export enum OperatorEnum {
  OpenBrace             =         '{',
  CloseBrace            =         '}',
  Assign                =         '=',
  Result                =         '->',
  Comma                 =         ',',
}

// prettier-ignore
export enum KeywordEnum {
  Start                 =         'start',
  Goto                  =         'goto',
  If                    =         'if',
  Else                  =         'else',
  Switch                =         'switch',
  Case                  =         'case',
  Default               =         'default',
  Import                =         'import',
  From                  =         'from',
  Export                =         'export',
}

// prettier-ignore
export enum TokenKind {
  Comment               =         'comment',
  Operator              =         'operator',
  Keyword               =         'keyword',
  Identifier            =         'identifier',
  Action                =         'action',
  Path                  =         'path',
  EOP                   =         'eop'
}

export interface BaseToken {
  kind: TokenKind
  word: string
  range: Range
}

export interface Keyword extends BaseToken {
  kind: TokenKind.Keyword
  word: KeywordEnum
}

export const createKeyword = (word: KeywordEnum, range: Range): Keyword => {
  return {
    kind: TokenKind.Keyword,
    word,
    range,
  }
}

export interface Operator extends BaseToken {
  kind: TokenKind.Operator
  word: OperatorEnum
}

export const createOperator = (word: OperatorEnum, range: Range): Operator => {
  return {
    kind: TokenKind.Operator,
    word,
    range,
  }
}

export interface Identifier extends BaseToken {
  kind: TokenKind.Identifier
  word: string
}

export const createIdentifier = (word: string, range: Range): Identifier => {
  return {
    kind: TokenKind.Identifier,
    word,
    range,
  }
}

export interface Action extends BaseToken {
  kind: TokenKind.Action
  word: string
}

export const createAction = (word: string, range: Range): Action => {
  return {
    kind: TokenKind.Action,
    word,
    range,
  }
}

export interface Path extends BaseToken {
  kind: TokenKind.Path
  word: string
}

export const createPath = (word: string, range: Range): Path => {
  return {
    kind: TokenKind.Path,
    word,
    range,
  }
}

export interface Comment extends BaseToken {
  kind: TokenKind.Comment
  word: string
}

export const createComment = (word: string, range: Range): Comment => {
  return {
    kind: TokenKind.Comment,
    word,
    range,
  }
}

export interface EOP extends BaseToken {
  kind: TokenKind.EOP
  word: 'eop'
}

export const createEOP = (range: Range): EOP => {
  return {
    kind: TokenKind.EOP,
    word: 'eop',
    range,
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
