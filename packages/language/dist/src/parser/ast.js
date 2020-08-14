export var FragmentKind;
(function (FragmentKind) {
    FragmentKind["Program"] = "Program";
    FragmentKind["InferenceDeclaration"] = "InferenceDeclaration";
    FragmentKind["ImportStatement"] = "ImportStatement";
    FragmentKind["ModuleItems"] = "ModuleItems";
    FragmentKind["Module"] = "Module";
    FragmentKind["ExportStatement"] = "ExportStatement";
    FragmentKind["StartStatement"] = "StartStatement";
    FragmentKind["Block"] = "Block";
    FragmentKind["StepStatement"] = "StepStatement";
    FragmentKind["IfStatement"] = "IfStatement";
    FragmentKind["SwitchStatement"] = "SwitchStatement";
    FragmentKind["SwitchBlock"] = "SwitchBlock";
    FragmentKind["CaseClause"] = "CaseClause";
    FragmentKind["DefaultClause"] = "DefaultClause";
    FragmentKind["GotoStatement"] = "GotoStatement";
})(FragmentKind || (FragmentKind = {}));
export var createProgram = function (moduleStatemens, range) {
    return {
        kind: FragmentKind.Program,
        moduleStatemens: moduleStatemens,
        range: range
    };
};
export var createInferenceDeclaration = function (identifier, block, range) {
    return {
        kind: FragmentKind.InferenceDeclaration,
        identifier: identifier,
        block: block,
        range: range
    };
};
export var createImportStatement = function (moduleItems, path, range) {
    return {
        kind: FragmentKind.ImportStatement,
        moduleItems: moduleItems,
        path: path,
        range: range
    };
};
export var createModuleItems = function (identifiers, range) {
    return {
        kind: FragmentKind.ModuleItems,
        identifiers: identifiers,
        range: range
    };
};
export var createModule = function (identifier, declaration, range) {
    return {
        kind: FragmentKind.Module,
        identifier: identifier,
        declaration: declaration,
        range: range
    };
};
export var createExportStatement = function (module, range) {
    return {
        kind: FragmentKind.ExportStatement,
        module: module,
        range: range
    };
};
export var createStartStatement = function (module, range) {
    return {
        kind: FragmentKind.StartStatement,
        module: module,
        range: range
    };
};
export var createBlock = function (list, range) {
    return {
        kind: FragmentKind.Block,
        list: list,
        range: range
    };
};
export var createStepStatement = function (expression, range) {
    return {
        kind: FragmentKind.StepStatement,
        expression: expression,
        range: range
    };
};
export var createIfStatement = function (expression, ifBlock, elseBlock, range) {
    return {
        kind: FragmentKind.IfStatement,
        expression: expression,
        ifBlock: ifBlock,
        elseBlock: elseBlock,
        range: range
    };
};
export var createSwitchStatement = function (expression, switchBlock, range) {
    return {
        kind: FragmentKind.SwitchStatement,
        expression: expression,
        switchBlock: switchBlock,
        range: range
    };
};
export var createSwitchBlock = function (caseClauses, defaultClause, range) {
    return {
        kind: FragmentKind.SwitchBlock,
        caseClauses: caseClauses,
        defaultClause: defaultClause,
        range: range
    };
};
export var createCaseClause = function (expression, block, range) {
    return {
        kind: FragmentKind.CaseClause,
        expression: expression,
        block: block,
        range: range
    };
};
export var createDefaultClause = function (block, range) {
    return {
        kind: FragmentKind.DefaultClause,
        block: block,
        range: range
    };
};
export var createGotoStatement = function (identifier, range) {
    return {
        kind: FragmentKind.GotoStatement,
        identifier: identifier,
        range: range
    };
};
