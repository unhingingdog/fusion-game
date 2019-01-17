import React from 'react'
import ProgressBar from './ProgressBar'
import { createEventHandler } from 'recompose'

const { stream: click$, handler: eventHandler } = createEventHandler()

const areEqual = () => true

const DevelopmentConsole = () => (
    <>
        <div style={{ margin: 20, borderRadius: 15 }}>
            <ProgressBar 
            level={100} 
            height={400}
            width={30} 
            margin={5}
            complete={() => alert('hi')}
            empty={() => {}}
            transitionDuration={100}
            incrementValue={50} 
            decrementValue={10}
            border="1px solid grey"
            borderRadius={15}
            color="linear-gradient(red, orange)"
            onClickEvent={true}
            eventStream={click$}
            eventHandler={eventHandler}
            />
        </div>
        <div style={{ margin: 20 }}>
            <ProgressBar 
            level={100}
            width={60}
            height={400} 
            complete={() => alert('fuck')}
            empty={() => {}}
            transitionDuration={100}
            incrementValue={50} 
            decrementValue={10}
            />
        </div>
    </>
)

export default React.memo(DevelopmentConsole)