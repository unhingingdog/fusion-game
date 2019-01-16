import * as three from 'three'
import particleImage from './particle.png'
import ParticleSystem from './particleSystem';

const setup = canvas => {
    const renderer = new three.WebGLRenderer({ canvas, antialias: true })
    renderer.setClearColor(0x000000)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(canvas.width, canvas.height)

    const camera = new three.PerspectiveCamera(
        35, 
        canvas.width / canvas.height,
        0.1,
        3000
    )

    const scene = new three.Scene()
    const light = new three.AmbientLight('0xffffff', 0.5)
    scene.add(light)
    return { scene, camera, renderer }
}

export default canvas => {
    const { scene, camera, renderer } = setup(canvas)

    const plotCircle = (x0, y0, radius, n) => {
        const points = []
        for (let i = 0; i < n; i++) {
            const x = x0 + radius * Math.cos(2 * Math.PI * i / n)
            const y = y0 + radius * Math.sin(2 * Math.PI * i / n)

            points.push([x, y, 0])
        } 
        
        return points
    }



    // const attractorSet = plotCircle(0, 0, 30, 50)
    const circle = plotCircle(0, 0, 45, 1000)

    const particleSystem = new ParticleSystem({ 
        dragCoefficient: 0.001,
        // customForces: 
    })
    particleSystem.generateParticles({
        initialVelocity: [0, 0.1, 0.2],
        particleCount: 2500,
        generatedInitalPositions: { origin: [15, 10, -20], spread: [2, 2, 2] }
    })

    particleSystem.generateParticles({
        initialVelocity: [0, 0.1, -0.1],
        particleCount: 2500,
        generatedInitalPositions: { origin: [10, 20, 20], spread: [2, 2, 2] }
    })

    

    const circleatt = plotCircle(0, 0, 20, 30)

    // particleSystem.generateParticles({
    //     positionsSet: circleatt.slice(15),
    //     isAttractor: true,
    //     mass: 1
    // })
    particleSystem.generateParticles({
        positionsSet: [[0,0,0]],
        isAttractor: true,
        mass: 50
    })



    const getAngularForce = (angleIncrease, centrePosition, particlePosition) => {
        particlePosition = new three.Vector2(particlePosition.x, particlePosition.y)

        const theta = particlePosition.angle(centrePosition) + angleIncrease
        const hyp = particlePosition.distanceTo(centrePosition)


        const x = hyp * Math.cos(theta)
        const y = hyp * Math.sin(theta)

        const next = new three.Vector3(x,y,0)

        const result = particlePosition.sub(next)

        return new three.Vector3(result.x, result.y, 0)
    }

    const positions = particleSystem.getParticlePositions()
    const centre = new three.Vector2(0.000001, 0.000001, 0.000001)

    const geo = new three.Geometry()
    const attractorGeo = new three.Geometry()
    geo.vertices = particleSystem.getParticlePositions()
    attractorGeo.vertices = particleSystem.getAttractorPositions()

    const mat = new three.PointsMaterial({
        // color:0xffffff,
        size: 3,
        map:new three.TextureLoader().load(particleImage),
        blending: three.AdditiveBlending,
        transparent: true,
        depthTest: false
    })

    const mesh = new three.Points(geo,mat)
    
    const attractorMat = new three.PointsMaterial({color:0x00ff00, size: 1})
    const attractorMesh = new three.Points(attractorGeo, attractorMat)



    mesh.position.z = -200
    attractorMesh.position.z = -200
    scene.add(mesh)
    scene.add(attractorMesh)

    let boost = false
    setInterval(() => boost = true, 10000)

    const render = () => {

        let forces = null

        if (boost) {
            forces = positions.map(position => getAngularForce(0.0001, centre, position))
        }

        particleSystem.move(forces)

        forces = null
        boost = false

        mesh.geometry.verticesNeedUpdate = true
        // attractorMesh.verticesNeedUpdate = true
        
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}