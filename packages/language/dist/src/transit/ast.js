export var createTree = function (blocks, starts) {
    return {
        kind: NodeKind.Tree,
        blocks: blocks,
        starts: starts
    };
};
export var createBlock = function (name, children) {
    return {
        kind: NodeKind.Block,
        name: name,
        children: children
    };
};
export var createActionNode = function (expression) {
    return {
        kind: NodeKind.ActionNode,
        expression: expression
    };
};
export var createGotoNode = function (name) {
    return {
        kind: NodeKind.GotoNode,
        name: name
    };
};
export var createSwitchTree = function (condition, children, defaultChild) {
    return {
        kind: NodeKind.SwitchTree,
        condition: condition,
        children: children,
        defaultChild: defaultChild
    };
};
export var createCaseNode = function (expectation, children) {
    return {
        kind: NodeKind.CaseNode,
        expectation: expectation,
        children: children
    };
};
export var createDefaultNode = function (children) {
    return {
        kind: NodeKind.DefaultNode,
        children: children
    };
};
export var createIfTree = function (condition, successChildren, faildChildren) {
    return {
        kind: NodeKind.IfTree,
        condition: condition,
        successChildren: successChildren,
        faildChildren: faildChildren
    };
};
export var NodeKind;
(function (NodeKind) {
    NodeKind["Tree"] = "Tree";
    NodeKind["Block"] = "Block";
    NodeKind["ActionNode"] = "ActionNode";
    NodeKind["GotoNode"] = "GotoNode";
    NodeKind["SwitchTree"] = "SwitchTree";
    NodeKind["CaseNode"] = "CaseNode";
    NodeKind["DefaultNode"] = "DefaultNode";
    NodeKind["IfTree"] = "IfTree";
})(NodeKind || (NodeKind = {}));
