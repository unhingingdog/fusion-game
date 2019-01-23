import React from 'react'
import ProgressBar from './ProgressBar'
import { createEventHandler } from 'recompose'

const DevelopmentConsole = ({ 
    particleSystemProperty,
    particleSystemDispatch,
    particleSystemPropertyControl,
    style,
    maxPropertyValue,
    propertyIncrementAmount,
    propertyDecrementAmount,
    transitionDuration,
    decayDuration,
    actionType,
    barIncrementAmount,
    barDecrementAmount,
    zeroOnFull,
    incrementStream,
    decrementStream
}) => {
    if (!barIncrementAmount) 
        barIncrementAmount = (100 / maxPropertyValue) * propertyIncrementAmount
    if (!barDecrementAmount)
        barDecrementAmount = (100 / maxPropertyValue) * propertyDecrementAmount

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

    return(
        <ProgressBar 
            level={particleSystemProperty * 10} 
            height={style.height}
            width={style.width}
            margin={style.margin}
            incrementSideEffect={() => dispatchHandler(propertyIncrementAmount)}
            decrementSideEffect={() => dispatchHandler(-1 * propertyDecrementAmount)}
            transitionDuration={transitionDuration}
            incrementValue={barIncrementAmount}
            decrementValue={barDecrementAmount}
            decayDuration={decayDuration}
            border={style.border}
            borderRadius={style.borderRadius}
            color={style.color}
            increment$={increment$}
            incrementEventHandler={incrementHandler}
            decrement$={decrement$}
            decrementEventHandler={decrementHandler}
            zeroOnFull={zeroOnFull}
        />
    )
}

export default React.memo(DevelopmentConsole)