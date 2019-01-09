import React from 'react'
import ProgressBar from './ProgressBar'

const App = () => {

  return (
    <div className="App">
      <div style={{ margin: 100 }}>
        <ProgressBar 
          level={150} 
          height={300}
          width={100} 
          margin={3}
          complete={() => alert('fuck')}
          transitionDuration={100}
          incrementValue={50} 
          decrementValue={10}
          border="1px solid grey"
          borderRadius={10}
          color="black"
          clickEvent={true}
          keyEvent={true}
          />
        </div>
    </div>
  )
}

export default App;
