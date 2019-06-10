import React from 'react'
import ReactAntCrud from './components/ReactAntCrud/ReactAntCrud'
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
