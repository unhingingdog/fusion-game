import React, { useEffect } from 'react'

export default ({ particleLoss, totalParticles, running }) => {
    const styles = {
        mainContainer: {
            display: 'flex',
            flexDirection: 'column',
            margin: '27px 0 0 40px'
        },
        statusContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        status: {
            width: 15,
            height: 15,
            borderRadius: 7.5,
            background: running ? 'green' : 'red',
            marginRight: 7
        },
        plasmaLoss: {
            marginTop: 5
        }
    }

    return(
        <div style={styles.mainContainer}>
            <div style={styles.statusContainer}>
                <div style={styles.status}></div>
                <small>{running ? 'active' : 'inactive'}</small>
            </div>
            <div>
                <small style={styles.plasmaLoss}>{
                    running && 
                        Math.round((100 / totalParticles) * particleLoss) 
                        + '%' + ' plasma loss'
                }</small>
            </div>
        </div>
    )
}