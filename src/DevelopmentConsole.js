import React, { useEffect } from 'react'
import ProgressBar from './ProgressBar'
import { createEventHandler } from 'recompose'
import { 
    SET_ATTRACTOR_MASS, 
    SET_DRAG_COEFFICIENT,
    SET_PARTICLE_MASS
} from './types'
import ParticleSystem from './three/particleSystem';

const DevelopmentConsole = ({ 
    particleSystemState,
    particleSystemDispatch,
    particleControls 
}) => {
    const { stream: increment$, handler: incrementEventHandler } = createEventHandler()
    const { stream: decrement$, handler: decrementEventHandler } = createEventHandler()

    const { stream: incrementDC$, handler: incrementEventHandlerDC } = createEventHandler()
    const { stream: decrementDC$, handler: decrementEventHandlerDC } = createEventHandler()

    const changeAttractorMassHandler = (value) =>  {

        particleSystemDispatch({
            type: SET_ATTRACTOR_MASS,
            payload: [
                particleSystemState.attractorMass + value, 
                particleControls[SET_ATTRACTOR_MASS]
            ]
        })
    }   

    const changeDragCoefficient = (value) =>  {
        console.log(particleSystemState.dragCoeffcient, particleSystemState.dragCoeffcient * 10000)

        particleSystemDispatch({
            type: SET_DRAG_COEFFICIENT,
            payload: [
                particleSystemState.dragCoeffcient + value, 
                particleControls[SET_DRAG_COEFFICIENT]
            ]
        })
    }

    return(
        <>
            <div 
                style={{ margin: 20, borderRadius: 15 }}
                id={SET_ATTRACTOR_MASS}
            >
                <ProgressBar 
                    level={particleSystemState.attractorMass * 10} 
                    height={400}
                    width={30} 
                    margin={5}
                    incrementSideEffect={() => changeAttractorMassHandler(1)}
                    decrementSideEffect={() => changeAttractorMassHandler(-1)}
                    transitionDuration={500}
                    incrementValue={10} 
                    decrementValue={10}
                    decayDuration={1000}
                    border="1px solid grey"
                    borderRadius={15}
                    color="linear-gradient(red, orange)"
                    increment$={increment$}
                    incrementEventHandler={incrementEventHandler}
                    decrement$={decrement$}
                    decrementEventHandler={decrementEventHandler}
                />
            </div>
            <div style={{ margin: 20 }}>
                <ProgressBar 
                    level={particleSystemState.dragCoeffcient * 10000}
                    width={60}
                    height={400} 
                    complete={() => {}}
                    empty={() => {}}
                    transitionDuration={1000}
                    incrementValue={10} 
                    decrementValue={10}
                    increment$={incrementDC$}
                    incrementEventHandler={incrementEventHandlerDC}
                    decrement$={decrementDC$}
                    decrementEventHandler={decrementEventHandlerDC}
                    incrementSideEffect={() => changeDragCoefficient(0.001)}
                    decrementSideEffect={() => changeDragCoefficient(-0.001)}
                />
            </div>
        </>
    )
}

export default React.memo(DevelopmentConsole)