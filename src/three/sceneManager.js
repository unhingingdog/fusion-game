import particleImage from './particle.png'
import ParticleSystem from './particleSystem'
import { getAngularForce } from './gameUtils'
import { createScene, createMesh } from './graphicsSetup'

export default canvas => {
    const particleSystem = new ParticleSystem({ 
        dragCoefficient: 0.005
    })

    particleSystem.generateParticles({
        positionsSet: [[0,0,0]],
        isAttractor: true,
        mass: 5
    })

    particleSystem.generateParticles({
        initialVelocity: [0, 0.1, 0.2],
        particleCount: 5000,
        generatedInitalPositions: { origin: [15, 10, -20], spread: [2, 2, 2] },
        mass: 1
    })

    const { scene, camera, renderer } = createScene({ canvas })

    const particleMesh = createMesh({
        scene,
        particleLocations: particleSystem.getParticlePositions(),
        image: particleImage,
        size: 2
    })

    const attractorMesh = createMesh({
        scene,
        particleLocations: particleSystem.getAttractorPositions(),
        color: 0x00ff00,
        size: 1
    })

    const render = () => {
        particleSystem.move()

        particleMesh.geometry.verticesNeedUpdate = true
        attractorMesh.verticesNeedUpdate = true
        
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)

    return {
        SET_DRAG_COEFFICIENT: change => {
            particleSystem.changeDragCoeffcient(change)
        },
        SET_ATTRACTOR_MASS: change => { 
            particleSystem.changeAttractorsMass(change)
        },
        SET_PARTICLE_MASS: change => { 
            particleSystem.changeParticlesMass(change)
        }
    }
}