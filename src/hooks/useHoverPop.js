import { useState } from 'react'

export default (elementCount = 1) => {
    const [ elements, setElements ] = useState(new Array(elementCount).fill(false))

    const setElement = (hovering, elementIndex = 0) => {
        const newElements = [...elements]
        newElements[elementIndex] = hovering
        setElements(newElements)
    }

    const hoverEventHandlers = (elementIndex = 0) => ({
        onMouseOver: () => setElement(true, elementIndex),
        onMouseOut: () => setElement(false, elementIndex)
    })

    const hoverStyling = (scale, duration, elementIndex = 0) => ({
        transform: elements[elementIndex] ? `scale(${scale})` : 'none',
        transition: `transform ${duration / 1000}s ease-in-out`
    })

    return { hoverEventHandlers, hoverStyling  }
}