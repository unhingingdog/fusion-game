import React from 'react'
import ProgressBar from './ProgressBar'
import { createEventHandler } from 'recompose'
import { 
    SET_ATTRACTOR_MASS, 
    SET_DRAG_COEFFCIENT,
    SET_PARTICLE_MASS
} from './types'

const { stream: click$, handler: eventHandler } = createEventHandler()

const DevelopmentConsole = ({ alterParticleSystemAttribute }) => (
    <>
        <div style={{ margin: 20, borderRadius: 15 }}>
            <ProgressBar 
                level={50} 
                height={400}
                width={30} 
                margin={5}
                complete={() => alert('hi')}
                empty={() => {}}
                transitionDuration={100}
                incrementValue={5} 
                decrementValue={1}
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
            complete={() => {}}
            empty={() => {}}
            transitionDuration={100}
            incrementValue={5} 
            decrementValue={1}
            />
        </div>
    </>
)

export default React.memo(DevelopmentConsole, () => true)