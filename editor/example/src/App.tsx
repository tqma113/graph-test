import React from 'react';
import Editor from './Editor'

function App() {
  const onChange = (c: any, e: any) => {
    console.log({
      c,
      e
    })
  }
  return (
    <div className="App">
      <Editor onChange={onChange} />
    </div>
  );
}

export default App;
