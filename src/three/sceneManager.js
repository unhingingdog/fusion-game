import particleImage from './particle.png'
import ParticleSystem from './particleSystem'
import { getAngularForce, plotCircle } from './gameUtils'
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

    const initialLocations = plotCircle(0, 0, 30, 100)
    const initialVelocities = initialLocations.map(point => (
        getAngularForce(0.005, point)
    ))

    console.log(initialLocations)
    console.log(initialVelocities[0])
    
    initialLocations.map((location, index) => (
        particleSystem.generateParticles({
            initialVelocity: [initialVelocities[index].x,initialVelocities[index].y, initialVelocities[index].z],
            particleCount: 100,
            generatedInitalPositions: { origin: location, spread: [2, 2, 2] },
            mass: 1,
        })
    ))

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