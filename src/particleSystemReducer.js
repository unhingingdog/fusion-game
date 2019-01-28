import initialState from './initialState'
import {
    SET_PARTICLE_MASS,
    SET_ATTRACTOR_MASS,
    SET_DRAG_COEFFICIENT,
    START_SYSTEM,
    STOP_SYSTEM
  } from './types'

const minMass = 0.0000001
const blockZero = value => value <= 0 ? minMass : Math.round(value * 100000) / 100000

export default (state, action) => {
  let [ newValue, particleSystemFunction ] = action.payload

  newValue = blockZero(newValue)
  particleSystemFunction(newValue)

  switch(action.type) {
    case START_SYSTEM:
      return {
        ...state,
        running: true
      }
    case STOP_SYSTEM:
      return {
        ...state,
        attractorMass: initialState.attractorMass,
        dragCoefficient: initialState.dragCoefficient,
        running: false
      }
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