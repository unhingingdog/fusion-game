import {
    SET_PARTICLE_MASS,
    SET_ATTRACTOR_MASS,
    SET_DRAG_COEFFICIENT
  } from './types'

const minMass = 0.0000001
const blockZero = value => value <= 0 ? minMass : Math.round(value * 100000) / 100000

export default (state, action) => {
  let [ newValue, particleSystemFunction ] = action.payload

  newValue = blockZero(newValue)
  particleSystemFunction(newValue)

  switch(action.type) {
    case SET_PARTICLE_MASS: 
      return {
        ...state, 
        particleMass: newValue
      }
    case SET_ATTRACTOR_MASS:
    return {
      ...state, 
      attractorMass: newValue
    }
    case SET_DRAG_COEFFICIENT:
      return {
        ...state, 
        dragCoefficient: newValue 
      }
    default:
      return state
  }
}