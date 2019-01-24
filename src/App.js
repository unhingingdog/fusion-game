import React, { useState, useEffect, useReducer } from 'react'
import ParticleSystemControls from './ParticleSystemControls'
import ReactorWrapper from './ReactorWrapper'
import particleSystemReducer from './particleSystemReducer'
import { createEventHandler } from 'recompose'
import { SET_ATTRACTOR_MASS, SET_DRAG_COEFFICIENT } from './types'

const App = () => {
  const input = React.createRef()

  const [ particleControls, setControls ] = useState({})

  const initialParticleSystemState = {
    dragCoefficient: 0.005,
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
      <ParticleSystemControls
        particleSystemDispatch={particleSystemDispatch}
        particleSystemState={particleSystemState}
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
