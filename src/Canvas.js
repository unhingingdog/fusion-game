import React, { useEffect } from 'react'
import threeEntryPoint from './three/threeEntryPoint'



export default ({ width, height }) => {
    let canvas = React.createRef()

    useEffect(() => {
        canvas = canvas.current
        threeEntryPoint(canvas)
    })

    return <canvas width={width} height={height} ref={canvas} />
}