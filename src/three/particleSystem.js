import Particle from './particle'
import * as three from 'three'

export default class ParticleSystem {
    constructor({ particleResetCondition, attractors, dragCoefficient }) {
        this.particles = []
        this.particleResetCondition = particleResetCondition
        this.attractors = attractors || []
        this.dragCoefficient = dragCoefficient || 1
        this.particleResetCondition = particleResetCondition
    }

    generateParticles({
        particleCount, 
        initialAcceleration,
        initialVelocity,
        generatedInitalPositions,
        setPositions
    }) {
        initialVelocity = initialVelocity || [0, 0, 0]
        initialAcceleration = initialAcceleration || [0, 0, 0]
        generatedInitalPositions = generatedInitalPositions || 
            { origin: [0, 0, 0], spread: [1, 1, 1] }

        if (setPositions) {

        } else {
            const { origin, spread } = generatedInitalPositions

            for (let i = 0; i < (particleCount || this.particleCount); i++) {
                this.particles.push(
                        new Particle({
                        position: [
                            origin[0] + (Math.random() * spread[0]), 
                            origin[1] + (Math.random() * spread[1]), 
                            origin[2] + (Math.random() * spread[2]), 
                        ],
                        velocity: [
                            initialVelocity[0], 
                            initialVelocity[1], 
                            initialVelocity[2]
                        ],
                        acceleration: [
                            initialAcceleration[0],
                            initialAcceleration[1],
                            initialAcceleration[2],
                        ]
                    })
                )
            }
        }
    }

    // generateAttractors(attractorCount, positions = ) {

    // }

    generateDrag(particle) {
        const dragMagnitude = particle.velocity.clone().lengthSq() * this.dragCoefficient
        const drag = particle.velocity.clone().multiplyScalar(-1).normalize()
        return drag.multiplyScalar(dragMagnitude)
    }

    move(forces = []) {
        this.particles.forEach(particle => {
            if (this.particleResetCondition) {
                this.resetParticleOnConditions(particle)
            }

            if (forces[0]) {
                forces.forEach(force => particle.applyForce(force))
            }

            particle.applyForce(this.generateDrag(particle))

            if (this.attractors[0]) {
                this.attractors.forEach(attractor => 
                    particle.applyForce(attractor.attract(particle))
                )
            }
            particle.move()
        })
    }

    resetParticleOnConditions(particle) {
        if (this.particleResetCondition(particle)) particle.reset()
    }

    getParticlePositions() {
        return this.particles.map(particle => particle.position)
    }
}