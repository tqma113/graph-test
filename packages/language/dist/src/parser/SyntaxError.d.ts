import type { Token } from '../lexer';
export declare class SyntaxError extends Error {
    kind: "error";
    token: Token;
    constructor(message: string, token: Token);
}
