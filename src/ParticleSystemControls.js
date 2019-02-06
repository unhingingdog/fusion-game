import React, { useEffect } from 'react'
import ProgressBar from './ProgressBar'
import ParticleSystemPropertyController from './SystemPropertyController'
import PropertyRead from './PropertyRead'
import useHoverPop from './hooks/useHoverPop'
import { 
	SET_ATTRACTOR_MASS, 
	SET_DRAG_COEFFICIENT,
	GET_PARTICLE_LOSS
} from './types'


const ParticleSystemControls = ({ 
	particleSystemDispatch, 
	particleSystemState,
	particleControls,
	isMobile
}) => {

	useEffect(() => {
		if (Object.keys(particleControls).length && particleSystemState.running) {
			//Initial adjustment keeps particles in bounds
			particleSystemDispatch({
				type: SET_ATTRACTOR_MASS,
				payload: [
					particleSystemState.attractorMass + -0.5, 
					particleControls.SET_ATTRACTOR_MASS
				]
			})

			//periodically check particle loss, instead of calling every frame or loss
			const lossCheckInterval = setInterval(() => {
				particleSystemDispatch({
					type: GET_PARTICLE_LOSS,
					payload: [
						particleControls[GET_PARTICLE_LOSS](), 
						() => {}
					]
				})
			}, 500)

			return () => clearTimeout(lossCheckInterval)
		}
	}, [particleSystemState.running])

	const styles = {
		mainContainer: {
			margin: '0px 20px 0px 20px',
			display: 'flex'
		},
		outerControllerContainer: {
			display: 'flex',
			alignItems: 'center'
		},
		innerControllerContainer: {
			margin: '0px 10px 0px 10px',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		label: {
			transform: 'rotate(270deg)',
			transformOrigin: 'left top 0',
			float: 'left',
			width: 12
		},
		progressBar: {
			height: isMobile ? 150 : 400
		}
	}

	const { hoverStyling, hoverEventHandlers } = useHoverPop(2)

	return (
		<div style={styles.mainContainer}>
			<div style={styles.outerControllerContainer}>
				<p style={styles.label}>Strength</p>
				<div 
					style={{ ...styles.innerControllerContainer, ...hoverStyling(1.01, 200, 0) }} 
					{...hoverEventHandlers(0)}
				>
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
								level={(100 / 4) * particleSystemProperty} 
								height={styles.progressBar.height}
								width={30}
								margin={5}
								incrementSideEffect={() => dispatchHandler(0.5)}
								decrementSideEffect={() => dispatchHandler(-0.5)}
								transitionDuration={500}
								incrementValue={100 / 5}
								decrementValue={100 / 25}
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
				<PropertyRead 
					read={particleSystemState.attractorMass}
					dPlaces={1} 
				/>
			</div>
		</div>
		<div style={styles.outerControllerContainer}>
			<p style={styles.label}>Resistance</p>
			<div 
				style={{ ...styles.innerControllerContainer, ...hoverStyling(1.01, 200, 1) }} 
				{...hoverEventHandlers(1)}
			>
				<ParticleSystemPropertyController 
						particleSystemProperty={particleSystemState.dragCoefficient}
						running={particleSystemState.running}
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
									height={styles.progressBar.height}
									width={30}
									margin={5}
									incrementSideEffect={() => dispatchHandler(0.0001)}
									decrementSideEffect={() => dispatchHandler(-0.0001)}
									transitionDuration={400}
									incrementValue={100}
									decrementValue={100}
									decayDuration={particleSystemState.running ? 400 : 0}
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
					<PropertyRead 
						read={particleSystemState.dragCoefficient} 
						weight={10000}
						dPlaces={0}  
					/>
				</div>
			</div>
		</div>
	)
}

export default ParticleSystemControls