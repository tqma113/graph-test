import { Token } from '../lexer';
import { LexicalError } from '../lexer/LexicalError';
import { SyntaxError } from './SyntaxError';
import type { Program } from './ast';
export * from './ast';
export * from './SyntaxError';
export declare type BlockType = 'global' | 'local';
export declare type Parser = {
    program: Program | null;
    tokens: Token[];
    lexcialErrors: LexicalError[];
    syntaxErrors: SyntaxError[];
    parse: () => void;
};
export declare const createParser: (input: string) => Parser;
