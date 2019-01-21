import React from 'react'
import { componentFromStream, createEventHandler } from 'recompose'
import { map, startWith, switchMap, mapTo, scan } from 'rxjs/operators'
import { merge, interval } from 'rxjs'
import './observableConfig'

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
        transitionDuration,
        onClickEvent,
        id
    } = props

    const styles = {
        container: {
            border,
            width: width + (margin * 2),
            height: height + (margin * 2),
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            borderRadius
        },
        inner: {
            background: color,
            width: level > (borderRadius / 3) ? width : width - borderRadius,
            height: level * (height / 100),
            margin: margin,
            borderRadius: borderRadius - margin,
            opacity: level > (borderRadius / 3) ? 1 : 0,
            transitionProperty: 'height width opacity',
            transitionDuration: transitionDuration / 1000 + 's',
            transitionTimingFunction: 'linear'
        }
    }
    
    return(
        <div 
            style={styles.container} 
            onClick={onClickEvent ? eventHandler : () => {}}
            level={level}
            id={id}
        >
            <div style={styles.inner}></div>
        </div>
    )
}

const ProgressBar = componentFromStream(prop$ => (
    prop$.pipe(
        switchMap(props => {
            let click$
            let eventHandler

            if(!props.eventStream) {
                const { stream, handler } = createEventHandler()
                click$ = stream
                eventHandler = handler
            } else {
                click$ = props.eventStream
                eventHandler = props.eventHandler
            }

            const increase$ = click$.pipe(mapTo(props.incrementValue))
            const decrease$ = interval(props.transitionDuration)
                .pipe(mapTo(-1 * props.decrementValue))
            const change$ = merge(increase$, decrease$)

            return change$.pipe(
                startWith(props.level),
                scan((acc, change) => {
                    const complete = acc >= 100
                    const empty = acc <= 0 && change < 0
                    change = change > (100 - acc) ? 100 - acc : change
                    
                    if (complete) props.complete()
                    if (empty) props.empty()
                    return empty ? 0 : acc + (complete ? (-1 * acc) : change)
                }),
                map(level => ({ 
                    level,
                    color: props.color || "linear-gradient(blue, purple)",
                    eventHandler,
                    eventStream: click$,
                    onClickEvent: props.onClickEvent || true,
                    margin: props.margin || 5, 
                    height: props.height,
                    width: props.width || 30,
                    borderRadius: props.borderRadius || (props.width ? props.width / 2 : 15),
                    border: props.border || "1px solid grey",
                    transitionDuration: props.transitionDuration
                })),
                map(BarPresentational)
            )
        })
    )
))

export default ProgressBar