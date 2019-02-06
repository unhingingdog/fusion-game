import React, { useState, useEffect } from 'react'
import useHoverPop from './hooks/useHoverPop'

export default ({ running, setPowerWhenNotRunning, toggleSystem, power  }) => {
    const { hoverStyling, hoverEventHandlers } = useHoverPop()
    const [ clickStyled, setClickStyled ] = useState(false)
    const [ locked, setLock ] = useState(false)

    const style = {
        color: `${running ? 'orange' : '#cdea3a'}`,
        background: clickStyled ? 
            `rgba(255,255,255, ${Math.max(0.2, power / 100)})` 
            : 'transparent',
        borderImage: 'linear-gradient(to right, red , yellow)',
        borderImageSlice: 5,
        height: 40,
        width: 85,
        fontSize: 13,
        fontFamily: 'Varela Round, sans-serif',
        ...hoverStyling(1.05, 200)
    }

    const clickHandler = () => {
            if (!locked) toggleSystem()
            setClickStyled(true)
            setTimeout(() => setClickStyled(false), 100)
    }

    useEffect(() => {
        if (running && !locked) setLock(true)
        setTimeout(() => setLock(false), 8000)
    }, [running])

    return(
        <button 
            style={style}
            {...hoverEventHandlers()}
            onClick={clickHandler}
        >
            {
                running ? 
                    locked ? 'locked' : 'shut down' 
                    : 'Ignite'
            }
        </button>
    )
    
}