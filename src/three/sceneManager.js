import * as three from 'three'
import particleImage from './particle.png'
import Particle from './particle'
import Attractor from './attractor';
import particleSystem from './particleSystem'
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
    const light = new three.AmbientLight(0xffffff, 0.5)
    scene.add(light)
    return { scene, camera, renderer }
}

export default canvas => {
    const { scene, camera, renderer } = setup(canvas)

    const attractorGeo = new three.Geometry()
    const attractors = []

    for (let i = 0; i < 40; i++) {
        const attractor = new Attractor([(i * 5) -80, 20, i * 10], 2)
        attractors.push(attractor)
        attractorGeo.vertices.push(attractor.position)
    }

    const geo = new three.Geometry()

    const particleSystem = new ParticleSystem({ attractors, dragCoefficient: 0.0001 })

    particleSystem.generateParticles({
        particleCount: 15000,
        generatedInitialPositions: { origin: [0, 0, 0], spread: [1, 1, 1] },
        initialVelocity: [0.2, 0.1, 0.2]
    })
    geo.vertices = particleSystem.getParticlePositions()

    const mat = new three.PointsMaterial({color:0xffffff,size: 2})
    const mesh = new three.Points(geo,mat)
    
    const attractorMat = new three.PointsMaterial({color:0x00ff00,size: 2})
    const attractorMesh = new three.Points(attractorGeo, attractorMat)


    mesh.position.z = -500
    attractorMesh.position.z = -500
    scene.add(mesh)
    scene.add(attractorMesh)

    const render = () => {

        particleSystem.move()

        mesh.geometry.verticesNeedUpdate = true
        
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
}