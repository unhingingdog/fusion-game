import React, { useState, useEffect } from 'react'
import DevelopmentConsole from './DevelopmentConsole'
import Canvas from './ReactorWrapper'

const App = () => {
  
  const input = React.createRef()

  const [ num, inc ] = useState(0)

  const context = React.createContext()


  const focusOnInput = () => input.current.focus()

  useEffect(() => {
    focusOnInput()
  })

  return (
    <div className="App" style={{ display: 'flex' }} onClick={() => {}}>
      <input 
        type="text"
        ref={input} 
        // onKeyPress={eventHandler}
        style={{ height: 0 }} 
      />
      <DevelopmentConsole />
      <button onClick={() => inc(num + 1)}>{num}</button>
      <Canvas width="400" height="400" />
    </div>
  )
}

export default App;
