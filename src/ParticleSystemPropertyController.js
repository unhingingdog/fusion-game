import React, { useEffect, useState } from 'react'
import { createEventHandler } from 'recompose'

const areEqual = (prevProps, nextProps) => {
    prevProps = { ...prevProps, render: null }
    nextProps = { ...nextProps, render: null }
    let equal = true

    Object.keys(prevProps).map(key => {
        if(prevProps[key] !== nextProps[key]) {
            equal = false
        } 
    })
    return equal
}

const ParticleSystemPropertyController = ({ 
    render,
    particleSystemProperty,
    particleSystemDispatch,
    particleSystemPropertyControl,
    actionType,
    incrementStream,
    decrementStream
}) => {

    if (!incrementStream) incrementStream = createEventHandler()
    if (!decrementStream) decrementStream = createEventHandler()
    const { stream: increment$, handler: incrementHandler } = incrementStream
    const { stream: decrement$, handler: decrementHandler } = decrementStream

    const dispatchHandler = (value) =>  {
        particleSystemDispatch({
            type: actionType,
            payload: [
                particleSystemProperty + value, 
                particleSystemPropertyControl
            ]
        })
    }  

    return(particleSystemPropertyControl ? render({ 
        dispatchHandler, 
        increment$, 
        incrementHandler, 
        decrement$, 
        decrementHandler, 
        particleSystemProperty 
    }) : <div></div>)
}

export default React.memo(ParticleSystemPropertyController, areEqual)