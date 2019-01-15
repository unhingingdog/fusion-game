import Particle from './particle'

export default class Attractor extends Particle {
    constructor(properties) {
        super(properties)
        this.G = 1
    }

    attract(particle) {
        const distance = this.position.distanceTo(particle.position)
        const strength = (this.G * this.mass * particle.mass) / (distance * distance)
        const force = this.position.clone().sub(particle.position).normalize().multiplyScalar(strength)
        return force
    }
}