import React, { useState, useEffect } from 'react'
import { createEventHandler } from 'recompose'
import ProgressBar from './ProgressBar'
import SystemPropertyController from './SystemPropertyController'
import PropertyRead from './PropertyRead'
import StartAndShutDownButton from './StartAndShutdownButton'
import useHoverPop from './hooks/useHoverPop'

const PowerControl = ({ 
    running,
    magStrength,
    maxMagStrength, 
    totalParticles, 
    particleLoss, 
    toggleSystem,
    isMobile 
}) => {
    const [ power, setPower ] = useState(0)
    const { stream: increment$, handler: incrementHandler } = createEventHandler()

    useEffect(() => {
        if (power >= 100 && !running) setTimeout(toggleSystem, 500)
        if (power <= 0 && running) toggleSystem()
    }, [power])

    useEffect(() => {
        setPowerWhenRunning()
    }, [particleLoss, magStrength])

    const { hoverStyling, hoverEventHandlers } = useHoverPop()

    const styles = {
        outerContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 10
        },
        innerContainer: {
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            ...hoverStyling(1.01, 200)
        },
        buttonsContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 5
        },
        buttonContainer: {
            padding: 0
        },
        label: {
            marginTop: -1,
            lineHeight: 0.2,
        }
    }

    return(
    <div style={styles.outerContainer}>
        <div style={styles.innerContainer} {...hoverEventHandlers()}>
            <SystemPropertyController 
                increment$={increment$}
                incrementHandler={incrementHandler}
                render={({ increment$, incrementHandler}) => (
                    <ProgressBar
                        level={power} 
                        height={isMobile ? 150 : 400}
                        width={50}
                        margin={5}
                        incrementSideEffect={() => setPowerWhenNotRunning(5)}
                        decrementSideEffect={() => setPowerWhenNotRunning(-20)}
                        transitionDuration={500}
                        decayDuration={running ? 0 : 500}
                        border="1px solid grey"
                        borderRadius={15}
                        color="linear-gradient(yellow, goldenrod)"
                        increment$={increment$}
                        incrementEventHandler={incrementHandler}
                        zeroOnFull={false}
                    />
                )} 
            />
            <PropertyRead 
                read={power}
                dPlaces={0}
                percentageMax={100} 
            />
            <p style={styles.label}>Power</p>  
        </div>
            <div style={styles.buttonsContainer}>
                <div style={styles.buttonContainer}>
                    <StartAndShutDownButton
                        running={running}
                        toggleSystem={toggleSystem}
                        power={power}
                        setPowerWhenNotRunning={setPowerWhenNotRunning}
                        particleLoss={particleLoss}
                    />
                </div>
            </div>
        </div>
    )

    function setPowerWhenRunning() {
        if (running) {
            const currentPower = (totalParticles - particleLoss) * magStrength
            const power = (100 / (totalParticles * maxMagStrength)) * currentPower
            setPower(power)
        }
    }

    function setPowerWhenNotRunning(value) {
        if (!running) setPower(Math.max(Math.min(value + power, 100), 0))
    }
}

export default React.memo(PowerControl)