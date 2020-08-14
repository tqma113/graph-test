declare const languageServer: {
    didChange: (_input: string) => void;
    readonly input: string;
    readonly definations: Map<string, any>;
    readonly lexicalErrors: any[];
    readonly syntaxErrors: any[];
    readonly semanticErrors: any[];
};
export default languageServer;
