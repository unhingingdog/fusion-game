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

    particleSystem.generateParticles({
        positionsSet: [[0,0,0]],
        isAttractor: true,
        mass: attractorMass
    })

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
        })
    ))

    const { scene, camera, renderer } = createScene({ canvas })

    camera.position.set( 0, 0, 100 )
    camera.lookAt(new three.Vector3())
    const controls = new OrbitControls(camera, canvas)
    controls.maxPolarAngle = 2.8
    controls.minPolarAngle = 1.5
    controls.maxAzimuthAngle = 0.4
    controls.minAzimuthAngle = 0
    controls.maxZoom = 100
    controls.panSpeed = 2
    controls.minDistance = 100
    controls.maxDistance = 200

    var spotLight = new three.SpotLight(0xffffff);
    spotLight.position.set(-200, 400, 300);
    scene.add(spotLight)    

    const particleMesh = createMesh({
        scene,
        particleLocations: particleSystem.getParticlePositions(),
        image: particleImage,
        size: 0.7,
        offset: [0, 0, -150]
    })

    const attractorMesh = createMesh({
        scene,
        particleLocations: particleSystem.getAttractorPositions(),
        color: 'black',
        size: 0,
        offset: [0, 0, -150]
    })

    const torusShellGeometry = new three.TorusGeometry(15, 11, 20, 30, 4)
    const torusInnerGeometry = new three.TorusGeometry(15, 10.5, 20, 30, 4)

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

    scene.add(new three.Mesh(torusShellGeometry, torusShellMaterial))
    scene.add(new three.Mesh(torusInnerGeometry, torusInnerMaterial))

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