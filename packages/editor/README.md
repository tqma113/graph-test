# gt-editor

Based on [monaco-editor](https://microsoft.github.io/monaco-editor) and [React](https://reactjs.org/).

## Usage

* install

```base
# npm
npm install gt-language gt-tree gt-editor

# yarn
yarn add gt-language gt-tree gt-editor
```

* example

```ts
import React, { useState } from 'react';
import CodeEditor from 'gt-editor'
import { Program } from 'gt-language'
import { Tree } from 'gt-tree'

function App() {
  const onCodeChange = (code: string, tree: Tree, program: Program) => {
    console.log({
      code,
      tree,
      program
    })
    setProgram(program)
    setTree(tree)
  }

  return (
    <CodeEditor onSave={onCodeChange} />
  )
}

```

## Note
> You must add [monaco-editor-webpack-plugin](https://github.com/microsoft/monaco-editor-webpack-plugin) before use it.
