import React, { useState, useEffect } from 'react'
import { createEventHandler } from 'recompose'
import ProgressBar from './ProgressBar'
import SystemPropertyController from './SystemPropertyController'
import PropertyRead from './PropertyRead'
import StartAndShutDownButton from './StartAndShutdownButton'
import useHoverPop from './hooks/useHoverPop'

const PowerControl = ({ 
    running, 
    totalParticles, 
    particleLoss, 
    toggleSystem,
    isMobile 
}) => {
    const [ power, setPower ] = useState(0)
    const { stream: increment$, handler: incrementHandler } = createEventHandler()

    useEffect(() => {
        if (power >= 100 && !running) toggleSystem()
        if (power <= 0 && running) toggleSystem()
    }, [power])

    useEffect(() => {
        if (running) {
            setPower(
                Math.max(
                    100 - ((100 / totalParticles) * Math.pow(particleLoss, 1.05)),
                    0
                )
            )
        }
    }, [particleLoss])

    const setPowerWhenNotRunning = value => {
        if (!running) setPower(Math.max(Math.min(value + power, 100), 0))
    }

    const { hoverStyling, hoverEventHandlers } = useHoverPop()

    const styles = {
        outerContainer: {
            display: 'flex'
        },
        innerContainer: {
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            ...hoverStyling(1.01, 200)
        }
    }

    return(
    <div style={styles.outerContainer}>
        <StartAndShutDownButton
            running={running}
            toggleSystem={toggleSystem}
        />
        <div style={styles.innerContainer} {...hoverEventHandlers()}>
            <SystemPropertyController 
                increment$={increment$}
                incrementHandler={incrementHandler}
                render={
                    ({
                        increment$,
                        incrementHandler,
                    }) => (
                        <ProgressBar
                            level={power} 
                            height={isMobile ? 200 : 400}
                            width={50}
                            margin={5}
                            incrementSideEffect={() => setPowerWhenNotRunning(5)}
                            decrementSideEffect={() => setPowerWhenNotRunning(-20)}
                            transitionDuration={500}
                            decayDuration={running ? 0 : 500}
                            border="1px solid grey"
                            borderRadius={15}
                            color="linear-gradient(gold, yellow)"
                            increment$={increment$}
                            incrementEventHandler={incrementHandler}
                        />
                    )
                } 
            />
            <PropertyRead 
                read={power}
                dPlaces={0} 
            />
        </div>
    </div>
    )
}

export default React.memo(PowerControl)