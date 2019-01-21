import React, { useState, useEffect, useReducer } from 'react'
import DevelopmentConsole from './DevelopmentConsole'
import ReactorWrapper from './ReactorWrapper'
import particleSystemReducer from './particleSystemReducer'
import { SET_ATTRACTOR_MASS, SET_DRAG_COEFFCIENT } from './types'

const App = () => {
  const input = React.createRef()

  const [ particleControls, setControls ] = useState({})

  const initialParticleSystemState = {
    dragCoeffcient: 0.1,
    particleMass: 10,
    attractorMass: 1
  }

  const [ particleSystemState, particleSystemDispatch ] = useReducer(
    particleSystemReducer, 
    initialParticleSystemState
  )

  const focusOnInput = () => input.current.focus()

  const alterParticleSystemAttribute = ({ target }) => {
    particleSystemDispatch({
      type: target.id,
      payload: [parseInt(target.value), particleControls[target.id]]
    })
  }

  return (
    <div className="App" style={{ display: 'flex' }} onClick={() => {}}>
      <button 
        onClick={alterParticleSystemAttribute}
        id={SET_DRAG_COEFFCIENT}
        value={1}
      >ch</button>
      <input 
        type="text"
        ref={input} 
        // onKeyPress={eventHandler}
        style={{ height: 0 }} 
      />
      <DevelopmentConsole />
      <ReactorWrapper 
        width="400" 
        height="400"
        passParticleControlsUp={setControls} 
      />
    </div>
  )
}

export default App;
