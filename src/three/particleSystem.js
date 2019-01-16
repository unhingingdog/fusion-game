import Particle from './particle'
import Attractor from './attractor'
import * as three from 'three'

// Todo: pull reset condition and custom forces set out of constructor. Move to 
// particle batch property associated with each particle generation. These will
// then be called with  F generateParticles. Possibly move each particle generation
// into ParticleInstance class.

export default class ParticleSystem {
    constructor({ particleResetCondition, dragCoefficient, bounds }) {
        this.particles = []
        this.attractors = []
        this.particleResetCondition = particleResetCondition
        this.dragCoefficient = dragCoefficient || 1
        this.bounds = bounds || [200, 200, 200]
        this.customForcesSet = []
    }

    generateParticles({
        particleCount, 
        initialAcceleration,
        initialVelocity,
        generatedInitalPositions,
        positionsSet,
        isAttractor
    }) {
        initialVelocity = initialVelocity || [0, 0, 0]
        initialAcceleration = initialAcceleration || [0, 0, 0]
        generatedInitalPositions = generatedInitalPositions || 
            { origin: [0, 0, 0], spread: [1, 1, 1] }
        const type = isAttractor ? Attractor : Particle

        const positions = positionsSet || this.generateParticlePositions( 
            particleCount, generatedInitalPositions 
        )

        const items = positions.map(position => {
            return new type({
                position,
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
        })

        if (isAttractor) {
            this.attractors = [...this.attractors, ...items]
        } else {
            this.particles = [...this.particles, ...items]
        }
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

    generateAttractors({        
        particleCount, 
        initialAcceleration,
        initialVelocity,
        generatedInitalPositions,
        positionsSet
    }) {
        this.generateParticles({
            particleCount, 
            initialAcceleration,
            initialVelocity,
            generatedInitalPositions,
            positionsSet,
            isAttractor: true
        })
    }

    generateDrag(particle) {
        const dragMagnitude = particle.velocity.clone().lengthSq() * this.dragCoefficient
        const drag = particle.velocity.clone().multiplyScalar(-1).normalize()
        return drag.multiplyScalar(dragMagnitude)
    }

    handleCustomForcesSet(customForcesSet) {
        if (this.particles.length !== customForcesSet.length) {
            throw `There are ${customForcesSet.length} forces 
            and ${this.particles.length}. Must be equal.`
        }

        this.customForcesSet = customForcesSet
    }

    move(customForcesSet) {
        if (customForcesSet) this.handleCustomForcesSet(customForcesSet)

        this.particles.forEach((particle, index) => {
            if (this.particleResetCondition) {
                this.resetParticleOnConditions(particle)
            }

            if (this.customForcesSet[0]) {
                particle.applyForce(this.customForcesSet[index])
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

    resetParticleOnConditions(particle) {
        if (this.particleResetCondition(particle)) particle.reset()
    }

    getParticlePositions() {
        return this.particles.map(particle => particle.position)
    }

    getAttractorPositions() {
        return this.attractors.map(particle => particle.position)
    }
}



    // if (this.attractors[0]) {
    //     // let closestAttractorDistance = Infinity

    //     this.attractors.forEach(attractor => {
    //         particle.applyForce(attractor.attract(particle))
    //         // if (particle.position.distanceTo(attractor.position) < closestAttractorDistance) {
    //         //     closestAttractorDistance = particle.position.distanceTo(attractor.position)
    //         // }
    //     })
    //     // if (closestAttractorDistance > 40) particle.reset()
    // }