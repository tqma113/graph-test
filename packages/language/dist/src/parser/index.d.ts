import { Token } from '../lexer';
import { SyntaxError } from './SyntaxError';
import type { Program } from './ast';
export declare type BlockType = 'global' | 'local';
export declare const createParser: (input: string) => {
    readonly program: Program | null;
    readonly tokens: Token[];
    readonly lexcialErrors: import("../lexer/LexicalError").LexicalError[];
    readonly syntaxErrors: SyntaxError[];
    parse: () => void;
};
