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
    const particleSet = plotCircle(0, 0, 40, 1000)

    const particleSystem = new ParticleSystem({ 
        dragCoefficient: 0.05,
        // customForces: 
    })
    particleSystem.generateParticles({
        initialVelocity: [0, 0, 0],
        particleCount: 5000,
        generatedInitalPositions: { origin: [10, 10, 10], spread: [10, 10, 10] },
    })

    const geo = new three.Geometry()
    // const attractorGeo = new three.Geometry()
    geo.vertices = particleSystem.getParticlePositions()
    // attractorGeo.vertices = particleSystem.getAttractorPositions()

    const mat = new three.PointsMaterial({
        // color:0xffffff,
        size: 3,
        map:new three.TextureLoader().load(particleImage),
        blending: three.AdditiveBlending,
        transparent: true,
        depthTest: false
    })

    const mesh = new three.Points(geo,mat)
    
    // const attractorMat = new three.PointsMaterial({color:0x00ff00, size: 1})
    // const attractorMesh = new three.Points(attractorGeo, attractorMat)



    mesh.position.z = -300
    // attractorMesh.position.z = -300
    scene.add(mesh)
    // scene.add(attractorMesh)

    const render = () => {
        const posits = particleSystem.getParticlePositions().map(p => ([p.x,p.y,p.z]))
        const forces = posits.map(p => {
            return [Math.cos(p[0])/ 1000, Math.sin(p[1])/ 1000, Math.tan(p[2]) / 1000]
        })

        particleSystem.move(forces)

        mesh.geometry.verticesNeedUpdate = true
        // attractorMesh.verticesNeedUpdate = true
        
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }

    // const centre = new three.Vector3(1, 1, 1)
    // const angles = particleSystem.particles.map(particle => particle.position.angleTo(centre))
    // // console.log(angles.map(angle => Math.sin(angle)))

    requestAnimationFrame(render)
}