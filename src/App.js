import React, { useState, useEffect, useReducer } from 'react'
import DevelopmentConsole from './DevelopmentConsole'
import ReactorWrapper from './ReactorWrapper'
import particleSystemReducer from './particleSystemReducer'
import { createEventHandler } from 'recompose'
import { SET_ATTRACTOR_MASS, SET_DRAG_COEFFICIENT } from './types'

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
      <div style={{ margin: 20 }}>
        <DevelopmentConsole
          particleSystemProperty={particleSystemState.attractorMass}
          particleSystemDispatch={particleSystemDispatch}
          particleSystemPropertyControl={particleControls.SET_ATTRACTOR_MASS}
          style={{
            height: 400,
            width: 30,
            margin: 5,
            border: "1px solid grey",
            borderRadius: 15,
            color: "linear-gradient(red, orange)"
          }}
          propertyIncrementAmount={1}
          propertyDecrementAmount={1}
          maxPropertyValue={10}
          transitionDuration={1000}
          decayDuration={1000}
          actionType={SET_ATTRACTOR_MASS}
        />
      </div>
      <div style={{ margin: 20 }}>
        <DevelopmentConsole
          particleSystemProperty={particleSystemState.dragCoeffcient}
          particleSystemDispatch={particleSystemDispatch}
          particleSystemPropertyControl={particleControls.SET_DRAG_COEFFICIENT}
          style={{
            height: 400,
            width: 30,
            margin: 5,
            border: "1px solid grey",
            borderRadius: 15,
            color: "linear-gradient(red, orange)"
          }}
          propertyIncrementAmount={0.01}
          propertyDecrementAmount={0.01}
          maxPropertyValue={0.1}
          transitionDuration={200}
          decayDuration={1000}
          actionType={SET_DRAG_COEFFICIENT}
          barIncrementAmount={10}
          barIncrementAmount={10}
        />
      </div>
      <ReactorWrapper 
        width="400" 
        height="400"
        passParticleControlsUp={setControls} 
      />
    </div>
  )
}

export default App;
