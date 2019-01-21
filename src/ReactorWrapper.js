import React, { useEffect } from 'react'
import sceneManager from './three/sceneManager'

const Canvas = ({ width, height, passParticleControlsUp }) => {
    let canvas = React.createRef()

    useEffect(() => {
        canvas = canvas.current
        const systemControls = sceneManager(canvas)
        passParticleControlsUp(systemControls)
    })

    return <canvas width={width} height={height} ref={canvas} />
}

export default React.memo(Canvas, () => true)