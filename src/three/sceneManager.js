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

    const particleSystem = new ParticleSystem({ dragCoefficient: 0.001 })

    const attractorSet = new Array(30).fill(0)
        .map((attractor, index) => ([index * 4, 0 * 10, 0]))

    const attractorSet2 = new Array(10).fill(0)
        .map((attractor, index) => ([0, index * 4, 0]))

    particleSystem.generateParticles({
        particleCount: 4000,
        generatedInitalPositions: { origin: [-10, -20, 20], spread: [1, 1, 1] },
        initialVelocity: [0.1, 0.1, 0.1],
        // positionsSet: [[0, 0, 0], [200, 200, 200]]
    })

    particleSystem.generateParticles({
        particleCount: 4000,
        generatedInitalPositions: { origin: [10, 20, -20], spread: [1, 1, 1] },
        initialVelocity: [0.1, 0.1, 0.1],
        // positionsSet: [[0, 0, 0], [200, 200, 200]]
    })

    particleSystem.generateAttractors({
        particleCount: 10,
        generatedInitialPositions: { origin: [100, 100, 100], spread: [10, 10, 10] },
        initialVelocity: [0, 0, 0],
        positionsSet: attractorSet,
        mass: 0.1
    })

    particleSystem.generateAttractors({
        particleCount: 10,
        generatedInitialPositions: { origin: [100, 100, 100], spread: [10, 10, 10] },
        initialVelocity: [0, 0, 0],
        positionsSet: attractorSet2,
        mass: 0.1
    })

    const geo = new three.Geometry()
    const attractorGeo = new three.Geometry()
    geo.vertices = particleSystem.getParticlePositions()
    attractorGeo.vertices = particleSystem.getAttractorPositions()

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
        attractorMesh.verticesNeedUpdate = true
        
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
}