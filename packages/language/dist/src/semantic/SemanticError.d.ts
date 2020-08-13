import type { Range } from '../index';
import type { Fragment } from '../parser/ast';
export declare class SemanticError extends Error {
    kind: "error";
    fragment: Fragment;
    range: Range;
    constructor(message: string, fragment: Fragment);
}
