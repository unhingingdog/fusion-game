import React, { useState, useEffect, useReducer } from 'react'
import ParticleSystemControls from './ParticleSystemControls'
import ReactorWrapper from './ReactorWrapper'
import particleSystemReducer from './particleSystemReducer'
import initialParticleSystemState from './initialState'

const App = () => {

  const [ particleControls, setControls ] = useState({})

  const [ particleSystemState, particleSystemDispatch ] = useReducer(
    particleSystemReducer, 
    initialParticleSystemState
  )  

  return (
    <div className="App" style={{ display: 'flex' }}>
      <ParticleSystemControls
        particleSystemDispatch={particleSystemDispatch}
        particleSystemState={particleSystemState}
        particleControls={particleControls}
      />
      <ReactorWrapper 
        width={window.innerHeight / 2} 
        height={window.innerHeight / 2}
        passParticleControlsUp={setControls} 
      />
    </div>
  )
}

export default App;
