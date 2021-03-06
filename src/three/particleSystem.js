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
        attractors,
        resetCondition,
        resetPosition,
        resetVelocity
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
            attractors: attractors || this.attractors,
            resetCondition,
            resetPosition,
            resetVelocity
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

    move(customParticleForce, customAttractorForce) {
        this.particleBatches.forEach(batch => batch.move(customParticleForce))
        this.attractorBatches.forEach(batch => batch.move(customAttractorForce))
    }

    getParticlePositions() {
        return this.particles.map(particle => particle.position)
    }

    getAttractorPositions() {
        return this.attractors.map(particle => particle.position)
    }

    getResetCounts() {
        if (this.particleBatches.length) {
            return this.particleBatches.reduce((acc, batch) => (
                acc + batch.multiGenerationParticles
                    .reduce((acc, particle) => acc + particle, 0)
            ), 0)
        }
        return 0
    }

    removeAllParticles() {
        this.particles = []
        this.particleBatches = []
    }

    changeDragCoeffcient(newCoefficient) {
        if (newCoefficient < 0) return
        this.dragCoefficient = newCoefficient
        this.particleBatches.forEach(batch => batch.changeDragCoeffcient(newCoefficient))
        this.attractorBatches.forEach(batch => batch.changeDragCoeffcient(newCoefficient))
    }

    changeParticlesMass(newMass) {
        if (newMass <= 0) return
        this.particleBatches.forEach(batch => batch.changeParticlesMass(newMass))
    }

    changeAttractorsMass(newMass) {
        this.attractorBatches.forEach(batch => batch.changeParticlesMass(newMass))
    }
}