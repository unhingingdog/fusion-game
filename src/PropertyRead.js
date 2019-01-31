import React from 'react'

export default ({ read, weight, dPlaces, percentageMax }) => {
    const style = {
         
    }

    const value = percentageMax ? 
        ((100 / percentageMax) * read).toFixed(0) + '%' :
        (read * (weight || 1)).toFixed(dPlaces)

    return <h2 style={style}>{value}</h2>
}

