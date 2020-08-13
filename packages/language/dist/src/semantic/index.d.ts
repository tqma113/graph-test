import { SemanticError } from './SemanticError';
import type { Program, InferenceDeclaration, ImportStatement } from '../parser/ast';
import type { Identifier } from '../lexer/index';
export declare type Inference = {
    identifier: Identifier;
    declaration: InferenceDeclaration | ImportStatement;
};
export declare const checkSemantic: (program: Program) => SemanticError[];
