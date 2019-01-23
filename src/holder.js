<div style={{ margin: 20 }}>
<DevelopmentConsole
  particleSystemProperty={particleSystemState.dragCoeffcient}
  particleSystemDispatch={particleSystemDispatch}
  particleSystemPropertyControl={particleControls.SET_DRAG_COEFFICIENT}
  style={{
    height: 400,
    width: 30,
    margin: 5,
    border: "1px solid grey",
    borderRadius: 15,
    color: "linear-gradient(red, orange)"
  }}
  propertyIncrementAmount={0.001}
  propertyDecrementAmount={0.001}
  maxPropertyValue={0.05}
  transitionDuration={200}
  decayDuration={1000}
  actionType={SET_DRAG_COEFFICIENT}
/>
</div>