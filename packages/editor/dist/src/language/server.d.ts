/**
 * language server
 * https://microsoft.github.io/language-server-protocol/
 */
import type { Inference, LexicalError, SyntaxError, SemanticError } from 'graph-language';
declare const languageServer: {
    didChange: (_input: string) => void;
    readonly input: string;
    readonly definations: Map<string, Inference>;
    readonly lexicalErrors: LexicalError[];
    readonly syntaxErrors: SyntaxError[];
    readonly semanticErrors: SemanticError[];
};
export default languageServer;
