import particleImage from './particle.png'
import metal from '../metal.jpg'
import ParticleSystem from './particleSystem'
import { getAngularForce, plotCircle } from './gameUtils'
import { createScene, createMesh } from './graphicsSetup'
import initialState from '../initialState'
import * as three from 'three'
import OrbitControls from 'threejs-orbit-controls'
const { 
    dragCoefficient, 
    attractorMass, 
    particleMass, 
    angularMomentum,
    radius,
    particleCount,
    particleClusterDistribution,
    clusterSpread
} = initialState

export default canvas => {
    const particleSystem = new ParticleSystem({ dragCoefficient })
    const centre = new three.Vector3(0.0001, 0.0001, 0.0001)

    particleSystem.generateParticles({
        positionsSet: [[0,0,0]],
        isAttractor: true,
        mass: attractorMass
    })

    const generateParticles = () => {
        const initialLocations = plotCircle(0, 0, radius, particleClusterDistribution )
        const initialVelocities = initialLocations.map(point => (
            getAngularForce(angularMomentum, point)
        ))
        
        initialLocations.map((location, index) => (
            particleSystem.generateParticles({
                initialVelocity: [
                    initialVelocities[index].x,
                    initialVelocities[index].y, 
                    initialVelocities[index].z
                ],
                particleCount: Math.floor(particleCount / particleClusterDistribution),
                generatedInitalPositions: { origin: location, spread: clusterSpread },
                mass: particleMass,
                resetCondition: particle => {
                    const distance = particle.position.distanceTo(centre)
                    if (distance < 3.2 || distance > 22) return true
                    return false
                },
                resetPosition: [500, 500, 500],
                resetVelocity: [0, 0, 0]
            })
        ))
    }

    const { scene, camera, renderer } = createScene({ canvas })

    camera.position.set( 0, 0, 100 )
    camera.lookAt(new three.Vector3())
    const controls = new OrbitControls(camera, canvas)
    controls.maxPolarAngle = 2.8
    controls.minPolarAngle = 1.5
    controls.maxAzimuthAngle = 0
    controls.minAzimuthAngle = 0
    controls.maxZoom = 100
    controls.panSpeed = 2
    controls.minDistance = 100
    controls.maxDistance = 200

    var spotLight = new three.SpotLight(0xffffff);
    spotLight.position.set(-200, 400, 300);
    scene.add(spotLight)  

    const torusShellGeometry = new three.TorusGeometry(12.5, 11, 20, 30, 4)
    const torusInnerGeometry = new three.TorusGeometry(12.5, 10.5, 20, 30, 4)

    const torusShellMaterial = new three.MeshPhongMaterial({ 
        color: 'grey',
        side: three.FrontSide,
        wireframe: true
    })
    const torusInnerMaterial = new three.MeshLambertMaterial({ 
        side: three.DoubleSide,
        map: new three.ImageUtils.loadTexture(metal),
        wireframeLinewidth: 20
    })
    
    createMesh({
        scene,
        particleLocations: particleSystem.getAttractorPositions(),
        color: 'black',
        size: 0,
        offset: [0, 0, -150]
    })

    let particleMesh

    const toggleSystem = (running) => {
        if (running) {
            generateParticles()

            particleMesh = createMesh({
                scene,
                particleLocations: particleSystem.getParticlePositions(),
                image: particleImage,
                size: 0.7,
                offset: [0, 0, -150]
            })
        } else {
            scene.remove(particleMesh)
            particleSystem.removeAllParticles()
            particleMesh = null
        }
    }

    scene.add(new three.Mesh(torusShellGeometry, torusShellMaterial))
    scene.add(new three.Mesh(torusInnerGeometry, torusInnerMaterial))

    const render = () => {
        if (particleMesh) { 
            particleSystem.move()
            particleMesh.geometry.verticesNeedUpdate = true 
        }

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
        },
        START_SYSTEM: toggleSystem.bind(null, true),
        STOP_SYSTEM: toggleSystem.bind(null, false)
    }
}