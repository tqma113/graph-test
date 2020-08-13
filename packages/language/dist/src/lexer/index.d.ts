import { TokenKind, OperatorEnum, KeywordEnum } from './constants';
import { LexicalError } from './LexicalError';
import type { Range } from '../index';
export declare type Keyword = {
    kind: TokenKind.Keyword;
    word: KeywordEnum;
    range: Range;
};
export declare type Operator = {
    kind: TokenKind.Operator;
    word: OperatorEnum;
    range: Range;
};
export declare type Identifier = {
    kind: TokenKind.Identifier;
    word: string;
    range: Range;
};
export declare type Action = {
    kind: TokenKind.Action;
    word: string;
    range: Range;
};
export declare type Path = {
    kind: TokenKind.Path;
    word: string;
    range: Range;
};
export declare type Comment = {
    kind: TokenKind.Comment;
    word: string;
    range: Range;
};
export declare type EOP = {
    kind: TokenKind.EOP;
    word: null;
    range: Range;
};
export declare type Token = Keyword | Operator | Identifier | Action | Path | Comment | EOP;
export declare type Lexer = {
    tokens: Token[];
    errors: LexicalError[];
    nextToken: () => Token | LexicalError;
    run: () => void;
};
export declare const createLexer: (input: string) => Lexer;
