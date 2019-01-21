import {
    SET_PARTICLE_MASS,
    SET_ATTRACTOR_MASS,
    SET_DRAG_COEFFCIENT
  } from './types'

export default (state, action) => {
    const [ newValue, particleSystemFunction ] = action.payload
    particleSystemFunction(newValue)

    switch(action.type) {
      case SET_PARTICLE_MASS: 
        return {...state, particleMass: newValue }
      case SET_ATTRACTOR_MASS:
      return {...state, attractorMass: newValue }
      case SET_DRAG_COEFFCIENT:
        return {...state, dragCoeffcient: newValue }
      default:
        return state
    }
  }