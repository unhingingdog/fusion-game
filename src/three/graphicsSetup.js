import * as three from 'three'

export const createScene = ({ canvas, color, cameraSettings, lights }) => {
    color = color || 0x000000
    cameraSettings = cameraSettings || [35, canvas.width / canvas.height, 0.1, 3000]
    lights = lights || [['0xffffff', 0.5]]

    const renderer = new three.WebGLRenderer({ canvas })
    renderer.setClearColor(color)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(canvas.width, canvas.height)

    const camera = new three.PerspectiveCamera(...cameraSettings)

    const scene = new three.Scene()

    lights.forEach(light => {
        scene.add(new three.AmbientLight(...light))
    });

    return { scene, camera, renderer }
}

export const createMesh = ({ 
    scene, 
    particleLocations, 
    materialSettings, 
    size, 
    image, 
    color, 
    offset 
}) => {
    materialSettings = materialSettings || {
        blending: three.AdditiveBlending,
        transparent: true,
        depthTest: false
    }
    color = color || '0xffffff'
    size = size || 1
    let [xOffset, yOffset, zOffset] = offset
    zOffset = zOffset || -200
    yOffset = yOffset || 0
    xOffset = xOffset || 0


    const geometry = new three.Geometry()
    geometry.vertices = particleLocations

    const mesh = new three.Points(
        geometry,
        new three.PointsMaterial({ 
            ...materialSettings, 
            map: image ? new three.TextureLoader().load(image) : null,
            size, 
            color,
            // alphaTest: 0.5
            depthTest: true 
        })
    )

    // mesh.position.z = zOffset
    // mesh.position.x = xOffset
    // mesh.position.y = yOffset
    scene.add(mesh)

    return mesh
}