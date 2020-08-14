import type { Identifier, Path, Action } from '../lexer';
import type { Range } from '../index';
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
export declare type Fragment = Program | Statement | ModuleStatement | ModuleItems | Module | Block | SwitchBlock | CaseClause | DefaultClause;
export declare type Program = {
    kind: FragmentKind.Program;
    moduleStatemens: ModuleStatement[];
    range: Range;
};
export declare const createProgram: (moduleStatemens: ModuleStatement[], range: Range) => Program;
export declare type ModuleStatement = InferenceDefinition | ImportStatement | ExportStatement | StartStatement;
export declare type InferenceDefinition = {
    kind: FragmentKind.InferenceDefinition;
    identifier: Identifier;
    block: Block;
    range: Range;
};
export declare const createInferenceDefinition: (identifier: Identifier, block: Block, range: Range) => InferenceDefinition;
export declare type ImportStatement = {
    kind: FragmentKind.ImportStatement;
    moduleItems: ModuleItems;
    path: Path;
    range: Range;
};
export declare const createImportStatement: (moduleItems: ModuleItems, path: Path, range: Range) => ImportStatement;
export declare type ModuleItems = {
    kind: FragmentKind.ModuleItems;
    identifiers: Identifier[];
    range: Range;
};
export declare const createModuleItems: (identifiers: Identifier[], range: Range) => ModuleItems;
export declare type Module = {
    kind: FragmentKind.Module;
    identifier: Identifier;
    definition: InferenceDefinition | null;
    range: Range;
};
export declare const createModule: (identifier: Identifier, definition: InferenceDefinition | null, range: Range) => Module;
export declare type ExportStatement = {
    kind: FragmentKind.ExportStatement;
    module: Module;
    range: Range;
};
export declare const createExportStatement: (module: Module, range: Range) => ExportStatement;
export declare type StartStatement = {
    kind: FragmentKind.StartStatement;
    module: Module;
    range: Range;
};
export declare const createStartStatement: (module: Module, range: Range) => StartStatement;
export declare type Block = {
    kind: FragmentKind.Block;
    list: Statement[];
    range: Range;
};
export declare const createBlock: (list: Statement[], range: Range) => Block;
export declare type Statement = StepStatement | IfStatement | SwitchStatement | GotoStatement;
export declare type StepStatement = {
    kind: FragmentKind.StepStatement;
    expression: Action;
    range: Range;
};
export declare const createStepStatement: (expression: Action, range: Range) => StepStatement;
export declare type IfStatement = {
    kind: FragmentKind.IfStatement;
    expression: Action;
    ifBlock: Block;
    elseBlock: Block | null;
    range: Range;
};
export declare const createIfStatement: (expression: Action, ifBlock: Block, elseBlock: Block | null, range: Range) => IfStatement;
export declare type SwitchStatement = {
    kind: FragmentKind.SwitchStatement;
    expression: Action;
    switchBlock: SwitchBlock;
    range: Range;
};
export declare const createSwitchStatement: (expression: Action, switchBlock: SwitchBlock, range: Range) => SwitchStatement;
export declare type SwitchBlock = {
    kind: FragmentKind.SwitchBlock;
    caseClauses: CaseClause[];
    defaultClause: DefaultClause | null;
    range: Range;
};
export declare const createSwitchBlock: (caseClauses: CaseClause[], defaultClause: DefaultClause | null, range: Range) => SwitchBlock;
export declare type CaseClause = {
    kind: FragmentKind.CaseClause;
    expression: Action;
    block: Block;
    range: Range;
};
export declare const createCaseClause: (expression: Action, block: Block, range: Range) => CaseClause;
export declare type DefaultClause = {
    kind: FragmentKind.DefaultClause;
    block: Block;
    range: Range;
};
export declare const createDefaultClause: (block: Block, range: Range) => DefaultClause;
export declare type GotoStatement = {
    kind: FragmentKind.GotoStatement;
    identifier: Identifier;
    range: Range;
};
export declare const createGotoStatement: (identifier: Identifier, range: Range) => GotoStatement;
