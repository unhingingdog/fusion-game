const { stream: dragInc$, handler: dragIncHandler } = createEventHandler()
const { stream: dragDec$, handler: dragDecHandler } = createEventHandler()

const changeDragCoefficient = (value) =>  {
    particleSystemDispatchQueue.push({
        type: SET_DRAG_COEFFICIENT,
        payload: [
            particleSystemState.dragCoeffcient + value, 
            particleControls[SET_DRAG_COEFFICIENT]
        ]
    })
}

<div style={{ margin: 20 }}>
<ProgressBar 
    level={particleSystemState.dragCoeffcient * 10000}
    width={60}
    height={400} 
    complete={() => {}}
    empty={() => {}}
    transitionDuration={500}
    incrementValue={10} 
    decrementValue={10}
    decayDuration={1000}
    increment$={dragInc$}
    incrementEventHandler={dragIncHandler}
    decrement$={dragDec$}
    decrementEventHandler={dragDecHandler}
    incrementSideEffect={() => changeDragCoefficient(0.001)}
    decrementSideEffect={() => changeDragCoefficient(-0.001)}
/>
</div>