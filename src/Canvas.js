import React, { useEffect } from 'react'

export default ({ width, height }) => {
    let canvas = React.createRef()
    let context
    let gl
    let shaderProgram

    const initGL = () => {
        canvas = canvas.current
        gl = canvas.getContext("webgl")
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.clearColor(1, 0, 0, 1)
    }

    const createShaders = () => {
        let vs = ""
        vs += "void main(void) {"
        vs += " gl_Position = vec4(0.0, 0.0, 0.0, 1.0);"
        vs += " gl_PointSize = 10.0;"
        vs += "} "

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(vertexShader, vs)
        gl.compileShader(vertexShader)

        let fs = ""
        fs += "void main(void) {"
        fs += " gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);"
        fs += "} "

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(fragmentShader, fs)
        gl.compileShader(fragmentShader)
        shaderProgram = gl.createProgram()
        gl.attachShader(shaderProgram, vertexShader)
        gl.attachShader(shaderProgram, fragmentShader)
        gl.linkProgram(shaderProgram)
        gl.drawArrays(gl.POINTS, 0, 1)
    }

    const draw = () => {
        gl.clear(gl.COLOR_BUFFER_BIT)
    }

    useEffect(() => {
        initGL()
        draw()
    })

    return <><canvas width={width} height={height} ref={canvas} /></>
}