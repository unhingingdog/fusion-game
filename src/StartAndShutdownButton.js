import React, { useState } from 'react'
import useHoverPop from './hooks/useHoverPop'

export default ({ running, setPowerWhenNotRunning, toggleSystem  }) => {
    const { hoverStyling, hoverEventHandlers } = useHoverPop()
    const [ gradientAngle, setGradientAngle ] = useState(10)

    const style = {
        color: `${running ? 'orange' : '#cdea3a'}`,
        background: 'transparent',
        borderRadius: 20,
        borderImage: 'linear-gradient(to right, red , yellow)',
        borderImageSlice: 5,
        height: 40,
        width: 85,
        fontSize: 13,
        fontFamily: 'Varela Round, sans-serif',
        ...hoverStyling(1.05, 200)
    }

    const clickHandler = () => {
        running ? toggleSystem() : setPowerWhenNotRunning(5)
    }

    return(
        <button 
            style={style}
            {...hoverEventHandlers()}
            onClick={clickHandler}
        >
            {running ? 'shut down' : 'Ignite'}
        </button>
    )
    
}