
declare type Action = {
    kind: TokenKind.Action;
    word: string;
    range: Range_2;
};

declare type Block = {
    kind: FragmentKind.Block;
    list: Statement[];
    range: Range_2;
};

declare type CaseClause = {
    kind: FragmentKind.CaseClause;
    expression: Action;
    block: Block;
    range: Range_2;
};

export declare const checkSemantic: (program: Program) => SemanticError[];

declare type Comment_2 = {
    kind: TokenKind.Comment;
    word: string;
    range: Range_2;
};

export declare const createParser: (input: string) => Parser;

declare type DefaultClause = {
    kind: FragmentKind.DefaultClause;
    block: Block;
    range: Range_2;
};

declare type EOP = {
    kind: TokenKind.EOP;
    word: null;
    range: Range_2;
};

declare type ExportStatement = {
    kind: FragmentKind.ExportStatement;
    module: Module;
    range: Range_2;
};

declare type Fragment = Program | Statement | ModuleStatement | ModuleItems | Module | Block | SwitchBlock | CaseClause | DefaultClause;

declare enum FragmentKind {
    Program = "Program",
    InferenceDeclaration = "InferenceDeclaration",
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

declare type GotoStatement = {
    kind: FragmentKind.GotoStatement;
    identifier: Identifier;
    range: Range_2;
};

declare type Identifier = {
    kind: TokenKind.Identifier;
    word: string;
    range: Range_2;
};

declare type IfStatement = {
    kind: FragmentKind.IfStatement;
    expression: Action;
    ifBlock: Block;
    elseBlock: Block | null;
    range: Range_2;
};

declare type ImportStatement = {
    kind: FragmentKind.ImportStatement;
    moduleItems: ModuleItems;
    path: Path;
    range: Range_2;
};

declare type InferenceDeclaration = {
    kind: FragmentKind.InferenceDeclaration;
    identifier: Identifier;
    block: Block;
    range: Range_2;
};

declare type Keyword = {
    kind: TokenKind.Keyword;
    word: KeywordEnum;
    range: Range_2;
};

declare enum KeywordEnum {
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

declare class LexicalError extends Error {
    kind: "error";
    position: Position_2;
    constructor(message: string, position: Position_2);
}

declare type Module = {
    kind: FragmentKind.Module;
    identifier: Identifier;
    declaration: InferenceDeclaration | null;
    range: Range_2;
};

declare type ModuleItems = {
    kind: FragmentKind.ModuleItems;
    identifiers: Identifier[];
    range: Range_2;
};

declare type ModuleStatement = InferenceDeclaration | ImportStatement | ExportStatement | StartStatement;

declare type Operator = {
    kind: TokenKind.Operator;
    word: OperatorEnum;
    range: Range_2;
};

declare enum OperatorEnum {
    OpenBrace = "{",
    CloseBrace = "}",
    Assign = "=",
    Result = "->",
    Comma = ","
}

declare type Parser = {
    program: Program | null;
    tokens: Token[];
    lexcialErrors: LexicalError[];
    syntaxErrors: SyntaxError_2[];
    parse: () => void;
};

declare type Path = {
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

declare type Program = {
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

declare class SemanticError extends Error {
    kind: "error";
    fragment: Fragment;
    range: Range_2;
    constructor(message: string, fragment: Fragment);
}

declare type StartStatement = {
    kind: FragmentKind.StartStatement;
    module: Module;
    range: Range_2;
};

declare type Statement = StepStatement | IfStatement | SwitchStatement | GotoStatement;

declare type StepStatement = {
    kind: FragmentKind.StepStatement;
    expression: Action;
    range: Range_2;
};

declare type SwitchBlock = {
    kind: FragmentKind.SwitchBlock;
    caseClauses: CaseClause[];
    defaultClause: DefaultClause | null;
    range: Range_2;
};

declare type SwitchStatement = {
    kind: FragmentKind.SwitchStatement;
    expression: Action;
    switchBlock: SwitchBlock;
    range: Range_2;
};

declare class SyntaxError_2 extends Error {
    kind: "error";
    token: Token;
    constructor(message: string, token: Token);
}

declare type Token = Keyword | Operator | Identifier | Action | Path | Comment_2 | EOP;

declare enum TokenKind {
    Comment = "comment",
    Operator = "operator",
    Keyword = "keyword",
    Identifier = "identifier",
    Action = "action",
    Path = "path",
    EOP = "eop"
}

export { }
