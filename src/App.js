import React, { useState, useEffect, useRef } from 'react'
import ReactAntCrud from './ReactAntCrud'
// import ReactAntCrud from './lib/index'
// import ReactAntCrud from 'react-ant-crud'
import './App.css'

import * as sample from './sample'

import { Layout } from 'antd'
const { Header, Content } = Layout


function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

function App() {
  let [clock, setClock] = useState(new Date())

  useInterval(() => {
    // Your custom logic here
    const newDate = new Date()
    console.log('clock set...' + newDate.toISOString())
    setClock(newDate)
  }, 10000);

  return (
    <Layout className="App">
      <Header style={{ background: '#fff', padding: 4 }}>{clock.toISOString()}</Header>
      <Content>
        <ReactAntCrud {...sample} />
      </Content>
    </Layout>
  )
}

export default App
