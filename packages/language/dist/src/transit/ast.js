export var createTree = function (blocks, start) {
    return {
        kind: NodeKind.Tree,
        blocks: blocks,
        start: start
    };
};
export var createBlock = function (name, children) {
    return {
        kind: NodeKind.Block,
        name: name,
        children: children
    };
};
export var createActionNode = function (floorId, expression) {
    return {
        kind: NodeKind.ActionNode,
        floorId: floorId,
        expression: expression
    };
};
export var createGotoNode = function (name) {
    return {
        kind: NodeKind.GotoNode,
        name: name
    };
};
export var createSwitchTree = function (condition, children) {
    return {
        kind: NodeKind.SwitchTree,
        condition: condition,
        children: children
    };
};
export var createCaseNode = function (expectation, children) {
    return {
        kind: NodeKind.CaseNode,
        expectation: expectation,
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
    NodeKind["IfTree"] = "IfTree";
})(NodeKind || (NodeKind = {}));
