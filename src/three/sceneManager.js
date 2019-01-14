import * as three from 'three'
import particleImage from './particle.png'
import Particle from './particle'
import Attractor from './attractor';

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
    const particleCount = 5000
    const geo = new three.Geometry()
    const particles = []

    for (let i = 0; i < particleCount; i++) {

        const particle = new Particle({
            position: [-120 + (i * 0.001), 20 + Math.random() * 20, -20 + Math.random() * 20],
            velocity: [0.1,Math.random() / 10, Math.random() / 10],
            acceleration: [0, 0, 0]
        })

        particles.push(particle)
        geo.vertices.push(particle.position)
    }

    const mat = new three.PointsMaterial({color:0xffffff,size: 2})
    const mesh = new three.Points(geo,mat)

    const attractorGeo = new three.Geometry()

    const attractors = []

    for (let i = 0; i < 10; i++) {
        const attractor = new Attractor([(i * 20) -80, 20, 0], 0.5)
        attractors.push(attractor)
        attractorGeo.vertices.push(attractor.position)
    }
    
    const attractorMat = new three.PointsMaterial({color:0x00ff00,size: 2})
    const attractorMesh = new three.Points(attractorGeo, attractorMat)


    mesh.position.z = -500
    attractorMesh.position.z = -500
    scene.add(mesh)
    scene.add(attractorMesh)

    const render = () => {
        particles.forEach(particle => {
            if ((Date.now() - particle.born) > 10000) {
                if (particle.velocity.lengthSq() < 0.05) particle.reset()
            }
            attractors.forEach(attractor => {
                const attractionForce = attractor.attract(particle)
                particle.applyForce(attractionForce)
            })
            particle.move()
        })

        mesh.geometry.verticesNeedUpdate = true
        
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
}