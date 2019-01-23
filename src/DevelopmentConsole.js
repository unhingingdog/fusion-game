import React from 'react'
import { createEventHandler } from 'recompose'

const DevelopmentConsole = ({ 
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

    return(render({ 
        dispatchHandler, 
        increment$, 
        incrementHandler, 
        decrement$, 
        decrementHandler, 
        particleSystemProperty 
    }))
}

export default DevelopmentConsole