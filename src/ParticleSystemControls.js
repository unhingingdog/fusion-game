import React from 'react'
import ProgressBar from './ProgressBar'
import ParticleSystemPropertyController from './ParticleSystemPropertyController'
import { SET_ATTRACTOR_MASS, SET_DRAG_COEFFICIENT } from './types'

const ParticleSystemControls = ({ 
	particleSystemDispatch, 
	particleSystemState,
	particleControls 
}) => {

	return (
		<>
			<div style={{ margin: 20 }}>
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
								incrementSideEffect={() => dispatchHandler(1)}
								decrementSideEffect={() => dispatchHandler(-0.5)}
								transitionDuration={1000}
								incrementValue={100 / 10}
								decrementValue={100 / 50}
								decayDuration={1000}
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
								level={(100 / 0.01) * particleSystemProperty} 
								height={400}
								width={30}
								margin={5}
								incrementSideEffect={() => dispatchHandler(0.001)}
								decrementSideEffect={() => dispatchHandler(-0.001)}
								transitionDuration={1000}
								incrementValue={100 / 10}
								decrementValue={100 / 100}
								decayDuration={1000}
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
			</div>
		</>
	)
}

export default ParticleSystemControls