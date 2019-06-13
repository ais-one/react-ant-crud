import React from 'react'
import Demo from './Demo'
// import ReactAntCrud from './ReactAntCrud'
// import ReactAntCrud from './lib/index'
// import ReactAntCrud from 'react-ant-crud'
import './App.css'

import * as sample from './sample'

function App() {
  return (
    <div className="App">
      {/* <ReactAntCrud {...sample} /> */}
      <Demo />
    </div>
  )
}

export default App
