import * as three from 'three'

export default class Particle {
    constructor(properties) {
        const { position: p, velocity: v, acceleration: a } = properties
        this.position = new three.Vector3(p[0], p[1], p[2])
        this.velocity = new three.Vector3(v[0], v[1], v[2])
        this.acceleration = new three.Vector3(a[0], a[1], a[2])
        this.mass = 1
        this.dragCoefficient = 0.0001
        this.born = Date.now()
    }

    applyForce(forceVector) {
        const f = forceVector.divideScalar(this.mass)
        this.acceleration = this.acceleration.add(f)
    }

    move() {
        this.bounce()
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
        this.applyForce(this.drag())
        this.acceleration.set(0,0,0)
    }

    drag() {
        const dragMagnitude = this.velocity.clone().lengthSq() * this.dragCoefficient
        const drag = this.velocity.clone().multiplyScalar(-1).normalize()
        return drag.multiplyScalar(dragMagnitude)
    }

    reset(initialPosition) {
        this.position.set(-120 + (Math.random() * 2), 20 + Math.random() * 2, -20 + Math.random() * 2)
        this.velocity.set(0.1, 0.1, 0.1)
        this.acceleration.set(0, 0, 0)
        this.born = Date.now()
    }

    bounce() {
        if(this.position.x >= 300) {
            this.position.x = 300
            this.velocity.x *= -1
            this.acceleration.x *= -1
          }
        
          if(this.position.x <= -300) {
            this.position.x = -300
            this.velocity.x *= -1
            this.acceleration.x *= -1
          }
        
          if(this.position.y >= 300) {
            this.position.y = 300
            this.velocity.y *= -1
            this.acceleration.y *= -1
          }
        
          if(this.position.y <= -300) {
            this.position.y = -300
            this.velocity.y *= -1
            this.acceleration.y *= -1
          }

          if(this.position.z >= 300) {
            this.position.z = 300
            this.velocity.z *= -1
            this.acceleration.z *= -1
          }
        
          if(this.position.z <= -300) {
            this.position.z = -300
            this.velocity.z *= -1
            this.acceleration.z *= -1
          }
    }
}