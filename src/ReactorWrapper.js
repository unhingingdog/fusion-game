import React, { useEffect } from 'react'
import sceneManager from './three/sceneManager'

const Canvas = ({ width, height }) => {
    let canvas = React.createRef()
    let force = () => console.log('not working')
    let shit = 'hi'
    let controls = {}

    useEffect(() => {
        canvas = canvas.current
        controls = sceneManager(canvas)
    })

    return (
        <>
          <button onClick={() => controls.changeDragCoeffcient(0)}>drag</button>
          <button onClick={() => controls.changeParticlesMass(1)}>mass</button>
          <button onClick={() => controls.changeAttractorMass(10)}>mass</button>
          <canvas width={width} height={height} ref={canvas} />
        </>
    )
}

export default React.memo(Canvas, true)