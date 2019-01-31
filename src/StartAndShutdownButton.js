import React from 'react'
import useHoverPop from './hooks/useHoverPop'

export default ({ toggleSystem, running }) => {
    const { hoverStyling, hoverEventHandlers } = useHoverPop()

    const style = {
        color: 'green',
        background: 'transparent',
        borderRadius: 15,
        border: '2px solid green',
        height: 40,
        width: 65,
        ...hoverStyling(1.05, 200)
    }

    return(
        <button 
            style={style}
            {...hoverEventHandlers()} 
        >
            Start
        </button>
    )
    
}