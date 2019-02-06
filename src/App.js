import React, { useState, useEffect, useReducer } from 'react'
import ParticleSystemControls from './ParticleSystemControls'
import PowerControl from './PowerControl'
import SystemStatus from './SystemStatus'
import ReactorWrapper from './ReactorWrapper'
import particleSystemReducer from './particleSystemReducer'
import initialParticleSystemState from './initialState'
import { START_SYSTEM, STOP_SYSTEM, SET_ATTRACTOR_MASS } from './types'

const App = () => {

  const [ particleControls, setControls ] = useState({})

  const [ particleSystemState, particleSystemDispatch ] = useReducer(
    particleSystemReducer, 
    initialParticleSystemState
  )  

  const isMobile = /Mobi|Android/i.test(navigator.userAgent)

  const desktopStyles = {
    mainContainer: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'black', 
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 7
    },
    gameContainer: { 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    },
    controlsContainer: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    credit: { 
      textDecoration: 'none', 
      marginTop: 0,
      fontSize: 11, 
      color: 'white' 
    },
    canvasHeight: window.screen.width / 4,
    canvasWidth: (window.screen.width / 4)
  }

  const mobileStyles = {
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      background: 'black', 
      color: 'white',
      alignItems: 'center',
      padding: 0,
      margin: 0,
      height: '100vh',
    },
    gameContainer: { 
      display: 'flex',
      flexDirection: 'column-reverse', 
      alignItems: 'center', 
      justifyContent: 'center',
    },
    controlsContainer: {
      display: 'flex'
    },
    credit: { 
      textDecoration: 'none', 
      marginTop: 35,
      fontSize: 10, 
      color: 'white' 
    },
    canvasHeight: window.screen.height / 4.5,
    canvasWidth: window.screen.width / 2
  }

  const styles = isMobile ? mobileStyles : desktopStyles

  return (
    <div style={styles.mainContainer}>
      <div style={styles.gameContainer}>
        <div style={styles.controlsContainer}>
          <PowerControl
            running={particleSystemState.running}
            magStrength={particleSystemState.attractorMass}
            maxMagStrength={4}
            totalParticles={initialParticleSystemState.particleCount}
            particleLoss={particleSystemState.particleLoss}
            toggleSystem={toggleSystem}
            isMobile={isMobile}
          />
          <div style={styles.particleSystemControlsContaine}>
            <ParticleSystemControls
              particleSystemDispatch={particleSystemDispatch}
              particleSystemState={particleSystemState}
              particleControls={particleControls}
              toggleSystem={toggleSystem}
              isMobile={isMobile}
            />
            <SystemStatus
              running={particleSystemState.running}
              particleLoss={particleSystemState.particleLoss}
              totalParticles={particleSystemState.particleCount}
              magStrength={particleSystemState.attractorMass}
            />
          </div>
        </div>
        <ReactorWrapper 
          width={styles.canvasWidth} 
          height={styles.canvasHeight}
          passParticleControlsUp={setControls} 
        />
      </div>
      <a href="http://h12n.nz" target="_blank" style={styles.credit}>
          Hamish Gilkison &copy; 2019
      </a>
    </div>
  )

  function toggleSystem() {
		if (!particleSystemState.running) {
			particleSystemDispatch({
				type: START_SYSTEM,
				payload: [
					null, 
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
			}, 1000)
		}

	}
}

export default App;
