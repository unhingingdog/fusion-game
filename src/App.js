import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import { createEventHandler } from 'recompose'

const App = () => {
  const { stream: click$, handler: eventHandler } = createEventHandler()
  setInterval(eventHandler, 1000)

  return (
    <div className="App" style={{ display: 'flex' }}>
      <div style={{ margin: 20 }}>
        <ProgressBar 
          level={100} 
          height={400}
          width={30} 
          margin={5}
          complete={() => alert('fuck')}
          empty={() => {}}
          transitionDuration={100}
          incrementValue={50} 
          decrementValue={10}
          border="1px solid grey"
          borderRadius={15}
          color="linear-gradient(red, orange)"
          onClickEvent={true}
          eventStream={click$}
          eventHandler={eventHandler}
        />
      </div>
      <div style={{ margin: 20 }}>
        <ProgressBar 
          level={100} 
          height={400}
          width={30} 
          margin={5}
          complete={() => alert('fuck')}
          empty={() => {}}
          transitionDuration={100}
          incrementValue={50} 
          decrementValue={10}
          border="1px solid grey"
          borderRadius={15}
          color="linear-gradient(blue, purple)"
          onClickEvent={true}
          eventStream={click$}
          eventHandler={eventHandler}
        />
      </div>
      <button onClick={eventHandler}>click</button>
    </div>
  )
}

export default App;
