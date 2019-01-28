import React, { useEffect } from 'react'
import ProgressBar from './ProgressBar'
import ParticleSystemPropertyController from './ParticleSystemPropertyController'
import { 
	SET_ATTRACTOR_MASS, 
	SET_DRAG_COEFFICIENT,
	START_SYSTEM,
	STOP_SYSTEM
} from './types'

const ParticleSystemControls = ({ 
	particleSystemDispatch, 
	particleSystemState,
	particleControls 
}) => {

	const toggleSystem = () => {
		if (!particleSystemState.running) {
			particleSystemDispatch({
				type: START_SYSTEM,
				payload: [
					, 
					particleControls.START_SYSTEM
				]
			})
		} else { 
			particleSystemDispatch({
				type: SET_ATTRACTOR_MASS,
				payload: [
					0, 
					particleControls.SET_ATTRACTOR_MASS
				]
			})

			setTimeout(() => { 
				particleSystemDispatch({
					type: STOP_SYSTEM,
					payload: [
						null, 
						particleControls.STOP_SYSTEM
					]
				})
			}, 3000)
		}

	}

	useEffect(() => {
		//Initial adjustment keeps particles in bounds
		console.log(particleSystemState.running)

		if (particleControls.SET_ATTRACTOR_MASS && particleSystemState.running) {
			particleSystemDispatch({
				type: SET_ATTRACTOR_MASS,
				payload: [
					particleSystemState.attractorMass + -0.5, 
					particleControls.SET_ATTRACTOR_MASS
				]
			})
		}
	}, [particleSystemState.running])

	return (
		<>
			<button onClick={toggleSystem}>start</button>
			<h2 style={{ transform: 'rotate(270deg)', height: 150 }}>Field Strength</h2>
			<div style={{ 
				margin: 20
			}}>
				<ParticleSystemPropertyController 
				particleSystemProperty={particleSystemState.attractorMass}
				particleSystemDispatch={particleSystemDispatch}
				particleSystemPropertyControl={particleControls.SET_ATTRACTOR_MASS}
				actionType={SET_ATTRACTOR_MASS}
				render={
					({
						particleSystemProperty,
						dispatchHandler,
						increment$,
						incrementHandler,
						decrement$,
						decrementHandler
					}) => (
						<ProgressBar
								level={(100 / 10) * particleSystemProperty} 
								height={400}
								width={30}
								margin={5}
								incrementSideEffect={() => dispatchHandler(0.5)}
								decrementSideEffect={() => dispatchHandler(-0.5)}
								transitionDuration={1000}
								incrementValue={100 / 10}
								decrementValue={100 / 50}
								border="1px solid grey"
								borderRadius={15}
								color="linear-gradient(red, orange)"
								increment$={increment$}
								incrementEventHandler={incrementHandler}
								decrement$={decrement$}
								decrementEventHandler={decrementHandler}
						/>
					)
				} 
			/>
			<h2>{particleSystemState.attractorMass}</h2>
		</div>
		<div style={{ margin: 20 }}>
			<ParticleSystemPropertyController 
					particleSystemProperty={particleSystemState.dragCoefficient}
					particleSystemDispatch={particleSystemDispatch}
					particleSystemPropertyControl={particleControls.SET_DRAG_COEFFICIENT}
					actionType={SET_DRAG_COEFFICIENT}
					render={
						({
						particleSystemProperty,
						dispatchHandler,
						increment$,
						incrementHandler,
						decrement$,
						decrementHandler
						}) => (
							<ProgressBar
								level={(100 / 0.001) * particleSystemProperty} 
								height={400}
								width={30}
								margin={5}
								incrementSideEffect={() => dispatchHandler(0.0001)}
								decrementSideEffect={() => dispatchHandler(-0.0001)}
								transitionDuration={1200}
								incrementValue={100}
								decrementValue={100}
								decayDuration={particleSystemState.running ? 1200 : 1000000}
								border="1px solid grey"
								borderRadius={15}
								color="linear-gradient(aqua, blue)"
								increment$={increment$}
								incrementEventHandler={incrementHandler}
								decrement$={decrement$}
								decrementEventHandler={decrementHandler}
							/>
						)
					} 
				/>
				<p>resistance</p>
				<h2>{particleSystemState.dragCoefficient}</h2>
			</div>
		</>
	)
}

export default ParticleSystemControls