import { SemanticError } from './SemanticError';
import type { Program, InferenceDefinition, ImportStatement } from '../parser/ast';
import type { Identifier } from '../lexer/index';
export * from './SemanticError';
export declare type Inference = {
    identifier: Identifier;
    definition: InferenceDefinition | ImportStatement;
};
export declare type CheckSemanticResult = {
    semanticErrors: SemanticError[];
    table: Map<string, Inference>;
};
export declare const analysis: (program: Program) => CheckSemanticResult;
