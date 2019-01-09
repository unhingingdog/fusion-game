import React from 'react'
import { componentFromStream, createEventHandler } from 'recompose'
import { map, startWith, switchMap, mapTo, scan } from 'rxjs/operators'
import { merge, interval } from 'rxjs'
import posed from 'react-pose'
import './observableConfig'

const OuterBox = posed.div({
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

const BarPresentational = props => {
    const { 
        level, 
        eventHandler,  
        margin, 
        height, 
        width,
        borderRadius,
        border,
        color,
        transitionDuration
    } = props

    const styles = {
        container: {
            border,
            width: width + (margin * 2),
            height: height + (margin * 2),
            display: 'flex',
            alignItems: 'flex-end',
            borderRadius
        },
        inner: {
            background: color,
            width: width,
            height: level,
            margin: margin,
            borderRadius: borderRadius - margin,
            transitionProperty: 'height',
            transitionDuration: transitionDuration / 1000 + 's',
            transitionTimingFunction: 'linear'
        }
    }

    return(
        <OuterBox 
            style={styles.container} 
            onClick={eventHandler}
        >
            <div style={styles.inner}></div>
        </OuterBox>
    )
}

const ProgressBar = componentFromStream(prop$ => {
    const { stream: click$, handler: eventHandler } = createEventHandler()

    return prop$.pipe(
        switchMap(props => {
            const increase$ = click$.pipe(mapTo(props.incrementValue))
            const decrease$ = interval(props.transitionDuration)
                .pipe(mapTo(-1 * props.decrementValue))
            const change$ = merge(increase$, decrease$)
            console.log(props)

            return change$.pipe(
                startWith(props.level),
                scan((acc, change) => {
                    const complete = acc >= props.height
                    const empty = acc <= 0 && change < 0
                    change = change > (props.height - acc) ? props.height - acc : change
                    
                    if (complete) props.complete()
                    if (empty) props.empty()
                    return empty ? 0 : acc + (complete ? (-1 * acc) : change)
                }),
                map(level => ({ 
                    level,
                    color: props.color || 'coral',
                    eventHandler, 
                    margin: props.margin, 
                    height: props.height,
                    width: props.width,
                    borderRadius: props.borderRadius || props.width / 20,
                    border: props.border || "1px solid black",
                    transitionDuration: props.transitionDuration
                })),
                map(BarPresentational)
            )
        })
    )
})

export default ProgressBar