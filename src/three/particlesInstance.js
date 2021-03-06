import Particle from './particle'
import Attractor from './attractor'

export default class ParticlesInstance {
    constructor({
        count, 
        initialAcceleration, 
        initialVelocity,
        generatedInitalPositions,
        positionsSet,
        isAttractor,
        dragCoefficient,
        attractors,
        resetCondition,
        resetPosition,
        resetVelocity,
        bounds
    }) {
        this.count = count
        this.initialAcceleration = initialAcceleration || [0, 0, 0]
        this.initialVelocity = initialVelocity || [0, 0, 0]
        this.positions = positionsSet || this.generateParticlePositions( 
            count, generatedInitalPositions 
        )
        this.isAttractor = isAttractor
        this.type = isAttractor ? Attractor : Particle
        this.particles = this.positions.map(position => {
            return new this.type({
                position,
                velocity: [
                    this.initialVelocity[0], 
                    this.initialVelocity[1], 
                    this.initialVelocity[2]
                ],
                acceleration: [
                    this.initialAcceleration[0],
                    this.initialAcceleration[1],
                    this.initialAcceleration[2],
                ],
                bounds
            })
        })
        this.dragCoefficient = dragCoefficient || 0.1
        this.attractors = attractors || []
        this.resetCondition = resetCondition
        this.resetPosition = resetPosition
        this.resetVelocity = resetVelocity
        this.bounds = bounds
        this.multiGenerationParticles = new Array(this.particles.length).fill(0)
    }

    generateParticlePositions(particleCount, generatedInitalPositions) {
        const { origin, spread } = generatedInitalPositions
        return new Array(particleCount).fill(particleCount)
            .map(position => ([
                origin[0] + (Math.random() * spread[0]), 
                origin[1] + (Math.random() * spread[1]), 
                origin[2] + (Math.random() * spread[2])
            ]))
    }

    move(customForce) {
        this.particles.forEach((particle, index) => {
            if (this.resetCondition) {
                this.resetParticleOnConditions(particle, index)
            }
    
            if (customForce) {
                particle.applyForce(customForce(particle))
            }
    
            particle.applyForce(this.generateDrag(particle))
    
            if (this.attractors[0]) {
                this.attractors.forEach(attractor => {
                    particle.applyForce(attractor.attract(particle))
                })
            }
    
            particle.move()
        })
    }

    resetParticleOnConditions(particle, index) {
        if (this.resetCondition(particle)) {
            particle.reset(this.resetPosition, this.resetVelocity)
            if (!this.multiGenerationParticles[index]) {
                this.multiGenerationParticles[index] = 1
            }
        }
    }

    generateDrag(particle) {
        const dragMagnitude = particle.velocity.clone().lengthSq() * this.dragCoefficient
        const drag = particle.velocity.clone().multiplyScalar(-1).normalize()
        return drag.multiplyScalar(dragMagnitude)
    }

    changeDragCoeffcient(newCoefficient) {
        this.dragCoefficient = newCoefficient
    }

    changeParticlesMass(newMass) {
        this.particles.forEach(particle => particle.changeMass(newMass))
    }
}


