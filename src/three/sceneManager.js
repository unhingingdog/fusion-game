import particleImage from './particle.png'
import ParticleSystem from './particleSystem'
import { getAngularForce } from './gameUtils'
import { createScene, createMesh } from './graphicsSetup'

export default canvas => {
    const { scene, camera, renderer } = createScene({ canvas })

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
        particleCount: 1000,
        generatedInitalPositions: { origin: [15, 10, -20], spread: [2, 2, 2] }
    })

    const particleMesh = createMesh({
        scene,
        particleLocations: particleSystem.getParticlePositions(),
        image: particleImage,
    })

    const attractorMesh = createMesh({
        scene,
        particleLocations: particleSystem.getAttractorPositions(),
        color: 0x00ff00,
        size: 6
    })

    const customForce = null //particle => getAngularForce(0.00001, false, particle.position)

    const render = () => {
        particleSystem.move(customForce)

        particleMesh.geometry.verticesNeedUpdate = true
        attractorMesh.verticesNeedUpdate = true
        
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}