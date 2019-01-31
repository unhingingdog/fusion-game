export default {
    dragCoefficient: 0.001,
    particleMass: 0.01,
    attractorMass: 2,
    angularMomentum: 0.0115,
    radius: 19,
    particleClusterDistribution: 1000,
    particleCount: (/Mobi|Android/i.test(navigator.userAgent)) ? 4000 : 12000,
    particleSize: (/Mobi|Android/i.test(navigator.userAgent)) ? 1.2 : 0.7,
    clusterSpread: [2, 2, 2],
    running: false,
    particleLoss: 0
}
