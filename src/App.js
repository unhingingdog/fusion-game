import React, { useState, useEffect } from 'react'
import ProgressBar from './ProgressBar'
import { createEventHandler } from 'recompose'
import posed from 'react-pose'

const BarContainer = posed.div({
  hoverable: true,
  init: {
      scale: 1,
      boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  },
  hover: {
      scale: 1.02,
      boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
  }
})

const App = () => {
  const { stream: click$, handler: eventHandler } = createEventHandler()
  const ref = React.createRef()
  const focusOnInput = () => ref.current.focus()

  useEffect(focusOnInput)

  return (
    <div className="App" style={{ display: 'flex' }} onClick={focusOnInput}>
      <input 
        type="text"
        ref={ref} 
        onKeyPress={eventHandler}
        style={{ height: 0 }} 
      />
      <BarContainer style={{ margin: 20, borderRadius: 15 }}>
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
      </BarContainer>
      <div style={{ margin: 20 }}>
        <ProgressBar 
          level={100}
          width={60}
          height={400} 
          complete={() => alert('fuck')}
          empty={() => {}}
          transitionDuration={100}
          incrementValue={50} 
          decrementValue={10}
        />
      </div>
    </div>
  )
}

export default App;
