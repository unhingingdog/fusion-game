import * as three from 'three'

export default class Particle {
    constructor(properties) {
        let { position, velocity, acceleration } = properties
        velocity = velocity || [0, 0, 0]
        acceleration = acceleration || [0, 0, 0]

        this.initialPosition = position
        this.initialVelocity = velocity
        this.position = new three.Vector3(position[0], position[1], position[2])
        this.velocity = new three.Vector3(velocity[0], velocity[1], velocity[2])
        this.acceleration = new three.Vector3(acceleration[0], acceleration[1], acceleration[2])
        this.mass = properties.mass || 1
        this.born = Date.now()
        this.bounds = properties.bounds
    }

    applyForce(forceVector) {
        const f = forceVector.divideScalar(this.mass)
        this.acceleration = this.acceleration.add(f)
    }

    move() {
        if (this.bounds) this.bounce()
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
        this.acceleration.set(0,0,0)
    }

    reset(resetPosition, resetVelocity) {
        this.position.set(resetPosition || this.initialPosition)
        this.velocity.set(resetVelocity || this.initialVelocity)
        this.acceleration.set(0, 0, 0)
        this.born = Date.now()
    }

    bounce() {
        const { bounds } = this

        if(this.position.x >= bounds[0]) {
            this.position.x = bounds[0]
            this.velocity.x *= -1
            this.acceleration.x *= -1
          }
        
          if(this.position.x <= -bounds[0]) {
            this.position.x = -bounds[0]
            this.velocity.x *= -1
            this.acceleration.x *= -1
          }
        
          if(this.position.y >= bounds[1]) {
            this.position.y = bounds[1]
            this.velocity.y *= -1
            this.acceleration.y *= -1
          }
        
          if(this.position.y <= -bounds[1]) {
            this.position.y = -bounds[1]
            this.velocity.y *= -1
            this.acceleration.y *= -1
          }

          if(this.position.z >= bounds[2]) {
            this.position.z = bounds[2]
            this.velocity.z *= -1
            this.acceleration.z *= -1
          }
        
          if(this.position.z <= -bounds[2]) {
            this.position.z = -bounds[2]
            this.velocity.z *= -1
            this.acceleration.z *= -1
          }
    }
}