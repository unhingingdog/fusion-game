import * as three from 'three'

export default class Attractor {
    constructor(position, mass) {
        this.position = new three.Vector3(position[0], position[1], position[2])
        this.mass = mass
        this.G = 1
    }

    attract(particle) {
        const distance = this.position.distanceTo(particle.position)
        const strength = (this.G * this.mass * particle.mass) / (distance * distance)
        const force = this.position.clone().sub(particle.position).normalize().multiplyScalar(strength)
        return force
    }
}