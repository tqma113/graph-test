import type { Position } from '../index';
export declare class LexicalError extends Error {
    kind: "error";
    position: Position;
    constructor(message: string, position: Position);
}
