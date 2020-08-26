# gtl-editor

Based on [monaco-editor](https://microsoft.github.io/monaco-editor) and [React](https://reactjs.org/).

## Usage

* install

```base
# npm
npm install gtl-language gtl-editor

# yarn
yarn add gtl-language gtl-editor
```

* example

```ts
import React, { useState } from 'react';
import CodeEditor from 'gtl-editor'
import { Tree, Program } from 'gtl-language'

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
