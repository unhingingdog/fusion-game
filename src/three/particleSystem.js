import ParticlesInstance from './particlesInstance'

export default class ParticleSystem {
    constructor({ dragCoefficient, bounds }) {
        this.particles = []
        this.attractors = []
        this.dragCoefficient = dragCoefficient || 1
        this.bounds = bounds || []
        this.particleBatches = []
        this.attractorBatches = []
    }

    generateParticles({
        particleCount, 
        initialAcceleration,
        initialVelocity,
        generatedInitalPositions,
        positionsSet,
        isAttractor,
        attractors
    }) {

        const particleBatch = new ParticlesInstance({
            count: particleCount, 
            initialAcceleration,
            initialVelocity,
            generatedInitalPositions,
            positionsSet,
            isAttractor,
            dragCoefficient: this.dragCoefficient,
            bounds: this.bounds,
            attractors: attractors || this.attractors
        })      

        if (isAttractor) {
            this.attractorBatches.push(particleBatch)
            this.attractors = [...this.attractors, ...particleBatch.particles]
        } else {
            this.particleBatches.push(particleBatch)
            this.particles = [...this.particles, ...particleBatch.particles]
        }
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

    move(customParticlesForcesSet, customAttractorsForcesSet) {
        this.particleBatches.forEach(batch => batch.move(customParticlesForcesSet))
        this.attractorBatches.forEach(batch => batch.move(customAttractorsForcesSet))
    }

    getParticlePositions() {
        return this.particles.map(particle => particle.position)
    }

    getAttractorPositions() {
        return this.attractors.map(particle => particle.position)
    }
}