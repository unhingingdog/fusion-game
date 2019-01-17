import * as three from 'three'

export const plotCircle = (x0, y0, radius, n) => {
    const points = []
    for (let i = 0; i < n; i++) {
        const x = x0 + radius * Math.cos(2 * Math.PI * i / n)
        const y = y0 + radius * Math.sin(2 * Math.PI * i / n)

        points.push([x, y, 0])
    } 
    
    return points
}

export const getAngularForce = (angleIncrease, centrePosition, particlePosition) => {
    centrePosition = centrePosition || new three.Vector2(0.000001, 0.000001, 0.000001)
    particlePosition = new three.Vector2(particlePosition.x, particlePosition.y)

    const theta = particlePosition.angle(centrePosition) + angleIncrease
    const hyp = particlePosition.distanceTo(centrePosition)

    const x = hyp * Math.cos(theta)
    const y = hyp * Math.sin(theta)

    const result = particlePosition.sub(new three.Vector3(x,y,0))

    return new three.Vector3(result.x, result.y, 0)
}