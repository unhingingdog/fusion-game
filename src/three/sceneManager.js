import * as three from 'three'
import particleImage from './particle.png'

export default canvas => {
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

    const light1 = new three.PointLight(0xffffff, 0.5)
    scene.add(light1)

    const particleCount = 50000
    const geo = new three.Geometry()
    const particles = []
    // const pMaterial = new three.ParticleBasicMaterial({
    //     color: 0xFFFFFF,
    //     size: 20,
    //     map: three.ImageUtils.loadTexture(particleImage),
    //     blending: three.AdditiveBlending,
    //     transparent: true
    // })

    for (let i = 0; i < particleCount; i++) {
        const pX = Math.random() * -100
        const pY = Math.random() * -100
        const pZ = Math.random() * -100

        const particle = {
            position: new three.Vector3(pX, pY, pZ),
            velocity: new three.Vector3(Math.random() * 10, 0.06, Math.random() * 10),
            acceleration: new three.Vector3(0, -0.001, 0)
        }

        particles.push(particle)
        geo.vertices.push(particle.position)
    }

    const mat = new three.PointsMaterial({color:0xffffff,size: 1})
    const mesh = new three.Points(geo,mat)
    mesh.position.z = -1000
    scene.add(mesh)

    // const particleSystem = new three.ParticleSystem(particles, pMaterial)
    // particleSystem.position.z = -300
    // particleSystem.sortParticles = true
    

    // scene.add(particleSystem)

    const render = () => {
        particles.forEach(particle => {
            particle.velocity.add(particle.acceleration)
            particle.position.add(particle.velocity)
        })

        // particleSystem.geometry.verticesNeedUpdate = true
        mesh.geometry.verticesNeedUpdate = true
        
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)


    
}