export declare type Tree = {
    kind: NodeKind.Tree;
    blocks: Block[];
    start: string;
};
export declare const createTree: (blocks: Block[], start: string) => Tree;
export declare type Block = {
    kind: NodeKind.Block;
    name: string;
    children: Node[];
};
export declare const createBlock: (name: string, children: Node[]) => Block;
export declare type Node = ActionNode | GotoNode | SwitchTree | IfTree;
export declare type ActionNode = {
    kind: NodeKind.ActionNode;
    floorId: number;
    expression: string;
};
export declare const createActionNode: (floorId: number, expression: string) => ActionNode;
export declare type GotoNode = {
    kind: NodeKind.GotoNode;
    name: string;
};
export declare const createGotoNode: (name: string) => GotoNode;
export declare type SwitchTree = {
    kind: NodeKind.SwitchTree;
    condition: string;
    children: CaseNode[];
};
export declare const createSwitchTree: (condition: string, children: CaseNode[]) => SwitchTree;
export declare type CaseNode = {
    kind: NodeKind.CaseNode;
    expectation: string;
    children: Node[];
};
export declare const createCaseNode: (expectation: string, children: Node[]) => CaseNode;
export declare type IfTree = {
    kind: NodeKind.IfTree;
    condition: string;
    successChildren: Node[];
    faildChildren: Node[];
};
export declare const createIfTree: (condition: string, successChildren: Node[], faildChildren: Node[]) => IfTree;
export declare enum NodeKind {
    Tree = "Tree",
    Block = "Block",
    ActionNode = "ActionNode",
    GotoNode = "GotoNode",
    SwitchTree = "SwitchTree",
    CaseNode = "CaseNode",
    IfTree = "IfTree"
}
