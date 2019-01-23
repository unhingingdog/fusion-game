import React, { useState, useEffect, useReducer } from 'react'
import DevelopmentConsole from './DevelopmentConsole'
import ReactorWrapper from './ReactorWrapper'
import particleSystemReducer from './particleSystemReducer'
import { createEventHandler } from 'recompose'

const App = () => {
  const input = React.createRef()

  const [ particleControls, setControls ] = useState({})

  const initialParticleSystemState = {
    dragCoeffcient: 0.001,
    particleMass: 1,
    attractorMass: 5
  }

  const [ particleSystemState, particleSystemDispatch ] = useReducer(
    particleSystemReducer, 
    initialParticleSystemState
  )

  const focusOnInput = () => input.current.focus()

  return (
    <div className="App" style={{ display: 'flex' }} onClick={() => {}}>
      <input 
        type="text"
        ref={input} 
        style={{ height: 0 }} 
      />
      <DevelopmentConsole
        particleSystemState={particleSystemState}
        particleSystemDispatch={particleSystemDispatch}
        particleControls={particleControls}
      />
      <ReactorWrapper 
        width="400" 
        height="400"
        passParticleControlsUp={setControls} 
      />
    </div>
  )
}

export default App;
