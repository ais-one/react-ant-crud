import React from 'react'
import ReactAntCrud from './ReactAntCrud'
// import ReactAntCrud from './lib/index'
// import ReactAntCrud from 'react-ant-crud'
import './App.css'

import * as sample from './sample'

function App() {
  return (
    <div className="App">
      <ReactAntCrud {...sample} />
    </div>
  )
}

export default App
