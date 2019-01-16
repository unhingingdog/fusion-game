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

    const particleSystem = new ParticleSystem({ 
        dragCoefficient: 0.001
    })

    particleSystem.generateParticles({
        positionsSet: [[0,0,0]],
        isAttractor: true,
        mass: 50
    })

    particleSystem.generateParticles({
        initialVelocity: [0, 0.1, 0.2],
        particleCount: 2500,
        generatedInitalPositions: { origin: [15, 10, -20], spread: [2, 2, 2] }
    })

    const geo = new three.Geometry()
    const attractorGeo = new three.Geometry()
    geo.vertices = particleSystem.getParticlePositions()
    attractorGeo.vertices = particleSystem.getAttractorPositions()

    const mat = new three.PointsMaterial({
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

    const render = () => {
        particleSystem.move()

        mesh.geometry.verticesNeedUpdate = true
        attractorMesh.verticesNeedUpdate = true
        
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}