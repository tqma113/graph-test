# gt-tree

## Useage

* Install

```bash
# npm
npm install gt-language gt-tree

# yarn
yarn  add gt-language gt-tree
```

* Use

```ts
import { parse } from 'gt-language'
import {
  convert,
  unfold,
} from 'gt-tree'

const input = sample
const { program, lexcialErrors, syntaxErrors } = parse(input)
if (program) {
  const tree = convert(program)
  const records = unfold(tree)
}
```

## Module

#### Transit

* convert

```ts
convert: (program: Program) => Tree
```

* reverse

```ts
reverse: (tree: Tree) => Program
```

#### Fold

* unfold

```ts
unfold = (tree: Tree): TreeNodeRecord[]
```

* fold

```ts
fold = (records: TreeNodeRecord[]): Tree
```

* unfoldRich

```ts
unfoldRich = (tree: RichTree): TreeNodeRecord[]
```

* foldRich

```ts
foldRich = (records: TreeNodeRecord[]): RichTree
```

## Structure

#### Graph Test Tree

```ts
export type Tree = {
  kind: NodeKind.Tree
  blocks: TreeBlock[]
  starts: string[]
  comments: string[]
}

export type TreeBlock = {
  kind: NodeKind.TreeBlock
  name: string
  children: TreeNode[]
  comments: string[]
}

export type TreeNode = ActionNode | GotoNode | SwitchTree | IfTree

export type ActionNode = {
  kind: NodeKind.ActionNode
  expression: string
  comments: string[]
}

export type GotoNode = {
  kind: NodeKind.GotoNode
  name: string
  comments: string[]
}

export type SwitchTree = {
  kind: NodeKind.SwitchTree
  condition: string
  children: CaseNode[]
  defaultChild: DefaultNode | null
  comments: string[]
}

export type CaseNode = {
  kind: NodeKind.CaseNode
  expectation: string
  children: TreeNode[]
  comments: string[]
}

export type DefaultNode = {
  kind: NodeKind.DefaultNode
  children: TreeNode[]
  comments: string[]
}

export type IfTree = {
  kind: NodeKind.IfTree
  condition: string
  successChildren: TreeNode[]
  faildChildren: TreeNode[]
  comments: string[]
}

export enum NodeKind {
  Tree = 'Tree',
  TreeBlock = 'TreeBlock',
  ActionNode = 'ActionNode',
  GotoNode = 'GotoNode',
  SwitchTree = 'SwitchTree',
  CaseNode = 'CaseNode',
  DefaultNode = 'DefaultNode',
  IfTree = 'IfTree',
}

```

#### Record

```ts
export enum LeafNodeKind {
  Start = 'Start',
  Comment = 'Comment',
  Expression = 'Expression',
  Condition = 'Condition',
  Name = 'Name',
  Expectation = 'Expectation',
}

export enum AntherNodeKind {
  SuccessBlock = 'SuccessBlock',
  FaildBlock = 'FaildBlock',
}

export type TreeNonLeafNodeRecord = {
  id: string
  floorId: number
  parentId: string
  kind: NodeKind | AntherNodeKind
  content: null
}

export type TreeLeafNodeRecord = {
  id: string
  floorId: number
  parentId: string
  kind: LeafNodeKind
  content: string
}

export type TreeNodeRecord = TreeNonLeafNodeRecord | TreeLeafNodeRecord

export type TreeNodeStatusRecord = {
  id: string
  path: string
  status: number
}

export type TreeNodeRecordWithDocumentId = TreeNodeRecord & {
  documentId: string
}

```

#### Graph Test Rich Tree

```ts
export type RichTree = {
  id: number
  kind: NodeKind.Tree
  blocks: RichTreeBlock[]
  starts: string[]
  comments: string[]
}

export type RichTreeBlock = {
  id: number
  kind: NodeKind.TreeBlock
  name: string
  children: RichTreeNode[]
  comments: string[]
}

export type RichTreeNode =
  | RichActionNode
  | RichGotoNode
  | RichSwitchTree
  | RichIfTree

export type RichActionNode = {
  id: number
  kind: NodeKind.ActionNode
  expression: string
  comments: string[]
}

export type RichGotoNode = {
  id: number
  kind: NodeKind.GotoNode
  name: string
  comments: string[]
}

export type RichIfTree = {
  id: number
  kind: NodeKind.IfTree
  condition: string
  successChildren: RichTreeNode[]
  faildChildren: RichTreeNode[]
  comments: string[]
}

export type RichSwitchTree = {
  id: number
  kind: NodeKind.SwitchTree
  condition: string
  children: RichCaseNode[]
  defaultChild: RichDefaultNode | null
  comments: string[]
}

export type RichCaseNode = {
  id: number
  kind: NodeKind.CaseNode
  expectation: string
  children: RichTreeNode[]
  comments: string[]
}

export type RichDefaultNode = {
  id: number
  kind: NodeKind.DefaultNode
  children: RichTreeNode[]
  comments: string[]
}
```