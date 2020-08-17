
export declare type Action = {
    kind: TokenKind.Action;
    word: string;
    range: Range_2;
};

export declare const analysis: (program: Program) => CheckSemanticResult;

export declare type Block = {
    kind: FragmentKind.Block;
    list: Statement[];
    range: Range_2;
};

export declare type BlockType = 'global' | 'local';

export declare type CaseClause = {
    kind: FragmentKind.CaseClause;
    expression: Action;
    block: Block;
    range: Range_2;
};

export declare type CheckSemanticResult = {
    semanticErrors: SemanticError[];
    table: Map<string, Inference>;
};

declare type Comment_2 = {
    kind: TokenKind.Comment;
    word: string;
    range: Range_2;
};
export { Comment_2 as Comment }

export declare const createBlock: (list: Statement[], range: Range_2) => Block;

export declare const createCaseClause: (expression: Action, block: Block, range: Range_2) => CaseClause;

export declare const createDefaultClause: (block: Block, range: Range_2) => DefaultClause;

export declare const createExportStatement: (module: Module, range: Range_2) => ExportStatement;

export declare const createGotoStatement: (identifier: Identifier, range: Range_2) => GotoStatement;

export declare const createIfStatement: (expression: Action, ifBlock: Block, elseBlock: Block | null, range: Range_2) => IfStatement;

export declare const createImportStatement: (moduleItems: ModuleItems, path: Path, range: Range_2) => ImportStatement;

export declare const createInferenceDefinition: (identifier: Identifier, block: Block, range: Range_2) => InferenceDefinition;

export declare const createLexer: (input: string) => Lexer;

export declare const createModule: (identifier: Identifier, definition: InferenceDefinition | null, range: Range_2) => Module;

export declare const createModuleItems: (identifiers: Identifier[], range: Range_2) => ModuleItems;

export declare const createParser: (input: string) => Parser;

export declare const createProgram: (moduleStatemens: ModuleStatement[], range: Range_2) => Program;

export declare const createStartStatement: (module: Module, range: Range_2) => StartStatement;

export declare const createStepStatement: (expression: Action, range: Range_2) => StepStatement;

export declare const createSwitchBlock: (caseClauses: CaseClause[], defaultClause: DefaultClause | null, range: Range_2) => SwitchBlock;

export declare const createSwitchStatement: (expression: Action, switchBlock: SwitchBlock, range: Range_2) => SwitchStatement;

export declare type DefaultClause = {
    kind: FragmentKind.DefaultClause;
    block: Block;
    range: Range_2;
};

export declare type EOP = {
    kind: TokenKind.EOP;
    word: null;
    range: Range_2;
};

export declare type ExportStatement = {
    kind: FragmentKind.ExportStatement;
    module: Module;
    range: Range_2;
};

export declare type Fragment = Program | Statement | ModuleStatement | ModuleItems | Module | Block | SwitchBlock | CaseClause | DefaultClause;

export declare enum FragmentKind {
    Program = "Program",
    InferenceDefinition = "InferenceDefinition",
    ImportStatement = "ImportStatement",
    ModuleItems = "ModuleItems",
    Module = "Module",
    ExportStatement = "ExportStatement",
    StartStatement = "StartStatement",
    Block = "Block",
    StepStatement = "StepStatement",
    IfStatement = "IfStatement",
    SwitchStatement = "SwitchStatement",
    SwitchBlock = "SwitchBlock",
    CaseClause = "CaseClause",
    DefaultClause = "DefaultClause",
    GotoStatement = "GotoStatement"
}

export declare type GotoStatement = {
    kind: FragmentKind.GotoStatement;
    identifier: Identifier;
    range: Range_2;
};

export declare type Identifier = {
    kind: TokenKind.Identifier;
    word: string;
    range: Range_2;
};

export declare type IfStatement = {
    kind: FragmentKind.IfStatement;
    expression: Action;
    ifBlock: Block;
    elseBlock: Block | null;
    range: Range_2;
};

export declare type ImportStatement = {
    kind: FragmentKind.ImportStatement;
    moduleItems: ModuleItems;
    path: Path;
    range: Range_2;
};

export declare type Inference = {
    identifier: Identifier;
    definition: InferenceDefinition | ImportStatement;
};

export declare type InferenceDefinition = {
    kind: FragmentKind.InferenceDefinition;
    identifier: Identifier;
    block: Block;
    range: Range_2;
};

export declare type Keyword = {
    kind: TokenKind.Keyword;
    word: KeywordEnum;
    range: Range_2;
};

export declare enum KeywordEnum {
    Start = "start",
    Goto = "goto",
    If = "if",
    Else = "else",
    Switch = "switch",
    Case = "case",
    Default = "default",
    Import = "import",
    From = "from",
    Export = "export"
}

export declare type Lexer = {
    tokens: Token[];
    errors: LexicalError[];
    getPosition: () => Position_2;
    next: () => Token;
    run: () => void;
};

export declare class LexicalError extends Error {
    kind: "error";
    position: Position_2;
    constructor(message: string, position: Position_2);
}

export declare type Module = {
    kind: FragmentKind.Module;
    identifier: Identifier;
    definition: InferenceDefinition | null;
    range: Range_2;
};

export declare type ModuleItems = {
    kind: FragmentKind.ModuleItems;
    identifiers: Identifier[];
    range: Range_2;
};

export declare type ModuleStatement = InferenceDefinition | ImportStatement | ExportStatement | StartStatement;

export declare type Operator = {
    kind: TokenKind.Operator;
    word: OperatorEnum;
    range: Range_2;
};

export declare enum OperatorEnum {
    OpenBrace = "{",
    CloseBrace = "}",
    Assign = "=",
    Result = "->",
    Comma = ","
}

export declare type Parser = {
    program: Program | null;
    tokens: Token[];
    lexcialErrors: LexicalError[];
    syntaxErrors: SyntaxError_2[];
    parse: () => void;
};

export declare type Path = {
    kind: TokenKind.Path;
    word: string;
    range: Range_2;
};

declare type Position_2 = {
    /**
       * Line position in a document (zero-based).
       */
    line: number;
    /**
       * Character offset on a line in a document (zero-based). Assuming that the line is
       * represented as a string, the `column` value represents the gap between the
       * `column` and `column + 1`.
       *
       * If the column value is greater than the line length it defaults back to the line
     * length.
       */
    column: number;
};
export { Position_2 as Position }

export declare type Program = {
    kind: FragmentKind.Program;
    moduleStatemens: ModuleStatement[];
    range: Range_2;
};

declare type Range_2 = {
    /**
       * The range's start position.
       */
    start: Position_2;
    /**
       * The range's end position.
       */
    end: Position_2;
};
export { Range_2 as Range }

export declare class SemanticError extends Error {
    kind: "error";
    fragment: Fragment;
    range: Range_2;
    constructor(message: string, fragment: Fragment);
}

export declare type StartStatement = {
    kind: FragmentKind.StartStatement;
    module: Module;
    range: Range_2;
};

export declare type Statement = StepStatement | IfStatement | SwitchStatement | GotoStatement;

export declare type StepStatement = {
    kind: FragmentKind.StepStatement;
    expression: Action;
    range: Range_2;
};

export declare type SwitchBlock = {
    kind: FragmentKind.SwitchBlock;
    caseClauses: CaseClause[];
    defaultClause: DefaultClause | null;
    range: Range_2;
};

export declare type SwitchStatement = {
    kind: FragmentKind.SwitchStatement;
    expression: Action;
    switchBlock: SwitchBlock;
    range: Range_2;
};

export declare enum SymbolChar {
    OpenBrace = "{",
    CloseBrace = "}",
    OpenBracket = "[",
    CloseBracket = "]",
    OpenAngleBracket = "<",
    CloseAngleBracket = ">",
    Assign = "=",
    Result = "->",
    Comma = ",",
    Quote = "\"",
    Well = "#"
}

declare class SyntaxError_2 extends Error {
    kind: "error";
    token: Token;
    constructor(message: string, token: Token);
}
export { SyntaxError_2 as SyntaxError }

export declare type Token = Keyword | Operator | Identifier | Action | Path | Comment_2 | EOP;

export declare enum TokenKind {
    Comment = "comment",
    Operator = "operator",
    Keyword = "keyword",
    Identifier = "identifier",
    Action = "action",
    Path = "path",
    EOP = "eop"
}

export { }
