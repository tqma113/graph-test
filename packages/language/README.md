# gtl-language

## Usage

* Install

```bash
# npm
npm install gt-language

# yarn
yarn  add gt-language
```

* Use

```ts
import { createParser, analysis } from 'gt-language'

const input = sample
const parser = createParser(input)
parser.parse()
if (parser.program) {
  const result = analysis(parser.program)
}
```

## Module

#### Lexer

* createLexer

```ts
createLexer: (input: string) => {
    tokens: Token[];
    lexicalErrors: LexicalError[];
    getPosition: () => Position;
    next: () => Token;
    run: () => void;
};
```

#### Parser

* createParser

```ts
createParser: (input: string) => {
    program: Program | null;
    tokens: Token[];
    lexcialErrors: LexicalError[];
    syntaxErrors: SyntaxError[];
    parse: () => void;
};
```

#### Semantic

* analysis

```ts
analysis: (program: Program) => {
    semanticErrors: SemanticError[];
    table: Map<string, Inference>;
}
```

#### Codegen

* codegen

```ts
codegen: (ast: Program) => string
```

#### Formater

* format

```ts
format: (ast: Program) => Program
```

#### Loader(TODO)

#### Linker(TODO)


## Structure

#### Common

```ts
export type Position = {
  line: number
  column: number
}

export type Range = {
  start: Position
  end: Position
}
```

#### Lexer

```ts
export type Keyword = {
  kind: TokenKind.Keyword
  word: KeywordEnum
  range: Range
}

export type Operator = {
  kind: TokenKind.Operator
  word: OperatorEnum
  range: Range
}

export type Identifier = {
  kind: TokenKind.Identifier
  word: string
  range: Range
}

export type Action = {
  kind: TokenKind.Action
  word: string
  range: Range
}

export type Path = {
  kind: TokenKind.Path
  word: string
  range: Range
}

export type Comment = {
  kind: TokenKind.Comment
  word: string
  range: Range
}

export type EOP = {
  kind: TokenKind.EOP
  word: 'eop'
  range: Range
}

export type Token =
  | Keyword
  | Operator
  | Identifier
  | Action
  | Path
  | Comment
  | EOP

export enum OperatorEnum {
  OpenBrace             =         '{',
  CloseBrace            =         '}',
  Assign                =         '=',
  Result                =         '->',
  Comma                 =         ',',
}

export enum KeywordEnum {
  Start                 =         'start',
  Goto                  =         'goto',
  If                    =         'if',
  Else                  =         'else',
  Switch                =         'switch',
  Case                  =         'case',
  Default               =         'default',
  Import                =         'import',
  From                  =         'from',
  Export                =         'export',
}

export enum TokenKind {
  Comment               =         'comment',
  Operator              =         'operator',
  Keyword               =         'keyword',
  Identifier            =         'identifier',
  Action                =         'action',
  Path                  =         'path',
  EOP                   =         'eop'
}

```

#### AST(Abstract Syntax Tree)

```ts
export enum FragmentKind {
  Program = 'Program',
  InferenceDefinition = 'InferenceDefinition',
  ImportStatement = 'ImportStatement',
  ModuleItems = 'ModuleItems',
  Module = 'Module',
  ExportStatement = 'ExportStatement',
  StartStatement = 'StartStatement',
  Block = 'Block',
  StepStatement = 'StepStatement',
  IfStatement = 'IfStatement',
  SwitchStatement = 'SwitchStatement',
  SwitchBlock = 'SwitchBlock',
  CaseClause = 'CaseClause',
  DefaultClause = 'DefaultClause',
  GotoStatement = 'GotoStatement',
}

export type Fragment =
  | Program
  | Statement
  | ModuleStatement
  | ModuleItems
  | Module
  | Block
  | SwitchBlock
  | CaseClause
  | DefaultClause

export type Program = {
  kind: FragmentKind.Program
  moduleStatemens: ModuleStatement[]
  range: Range
  comments: Comment[]
}

export type ModuleStatement =
  | InferenceDefinition
  | ImportStatement
  | ExportStatement
  | StartStatement

export type InferenceDefinition = {
  kind: FragmentKind.InferenceDefinition
  identifier: Identifier
  block: Block
  range: Range
  comments: Comment[]
}

export type ImportStatement = {
  kind: FragmentKind.ImportStatement
  moduleItems: ModuleItems
  path: Path
  range: Range
  comments: Comment[]
}

export type ModuleItems = {
  kind: FragmentKind.ModuleItems
  identifiers: Identifier[]
  range: Range
}

export type Module = {
  kind: FragmentKind.Module
  identifier: Identifier
  definition: InferenceDefinition | null
  range: Range
}

export type ExportStatement = {
  kind: FragmentKind.ExportStatement
  module: Module
  range: Range
  comments: Comment[]
}

export type StartStatement = {
  kind: FragmentKind.StartStatement
  module: Module
  range: Range
  comments: Comment[]
}

export type Block = {
  kind: FragmentKind.Block
  list: Statement[]
  range: Range
}

export type Statement =
  | StepStatement
  | IfStatement
  | SwitchStatement
  | GotoStatement

export type StepStatement = {
  kind: FragmentKind.StepStatement
  expression: Action
  range: Range
  comments: Comment[]
}

export type IfStatement = {
  kind: FragmentKind.IfStatement
  expression: Action
  ifBlock: Block
  elseBlock: Block | null
  range: Range
  comments: Comment[]
}

export type SwitchStatement = {
  kind: FragmentKind.SwitchStatement
  expression: Action
  switchBlock: SwitchBlock
  range: Range
  comments: Comment[]
}

export type SwitchBlock = {
  kind: FragmentKind.SwitchBlock
  caseClauses: CaseClause[]
  defaultClause: DefaultClause | null
  range: Range
}

export type CaseClause = {
  kind: FragmentKind.CaseClause
  expression: Action
  block: Block
  range: Range
  comments: Comment[]
}


export type DefaultClause = {
  kind: FragmentKind.DefaultClause
  block: Block
  range: Range
  comments: Comment[]
}

export type GotoStatement = {
  kind: FragmentKind.GotoStatement
  identifier: Identifier
  range: Range
  comments: Comment[]
}
```

#### Error

```ts
class LexicalError extends Error {
  kind = 'error' as const
  position: Position

  constructor(message: string, position: Position) {
    super(message)

    this.name = 'LexicalError'
    this.message = message
    this.position = position
    this.stack = `${message} at line: ${position.line}, column: ${position.column}`
  }
}

class SyntaxError extends Error {
  kind = 'error' as const
  token: Token

  constructor(message: string, token: Token) {
    super(message)

    this.name = 'SyntaxError'
    this.message = message
    this.token = token
    this.stack = `${message} at line: ${token.range.start.line}, column: ${token.range.start.column}`
  }
}

class SemanticError extends Error {
  kind = 'error' as const
  fragment: Fragment
  range: Range

  constructor(message: string, fragment: Fragment) {
    super(message)

    this.name = 'SemanticError'
    this.message = message
    this.fragment = fragment
    this.range = fragment.range
    this.stack = `${message} at line: ${fragment.range.start.line}, column: ${fragment.range.start.column}`
  }
}
```

## Specification

[Language Specification](../../docs/Specification.md)