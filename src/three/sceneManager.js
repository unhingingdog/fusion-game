import particleImage from './particle.png'
import ParticleSystem from './particleSystem'
import { getAngularForce } from './gameUtils'
import { createScene, createMesh } from './graphicsSetup'

export default canvas => {
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
        particleCount: 10000,
        generatedInitalPositions: { origin: [15, 10, -20], spread: [2, 2, 2] }
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

    let strength = 0.000001
    const customForce = particle => getAngularForce(strength, false, particle.position)

    const render = () => {
        particleSystem.move(customForce)

        particleMesh.geometry.verticesNeedUpdate = true
        attractorMesh.verticesNeedUpdate = true
        
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)

    return {
        addForce: () => {
            strength = strength * 10
            console.log(strength)
        },
        changeDragCoeffcient: change => {
            particleSystem.changeDragCoeffcient(change)
        },
        changeAttractorMass: change => { 
            particleSystem.changeAttractorsMass(change)
        },
        changeParticlesMass: change => { 
            particleSystem.changeParticlesMass(change)
        }
    }
}