import React from 'react'
import { componentFromStream, createEventHandler } from 'recompose'
import { map, startWith, switchMap, mapTo, scan, tap } from 'rxjs/operators'
import { merge, interval } from 'rxjs'
import './observableConfig'

const BarPresentational = props => {
    let { 
        level, 
        incrementEventHandler,
        decrementEventHandler,
        margin, 
        height, 
        width,
        borderRadius,
        border,
        color,
        transitionDuration,
        id
    } = props

    width = width || 30
    margin = margin || 5
    border = border || "1px solid grey"
    borderRadius = borderRadius || 15
    color = color || "linear-gradient(blue, purple)"

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
            onClick={incrementEventHandler ? incrementEventHandler : () => {}}
            level={level}
            id={id}
        >
            <div 
                style={styles.inner} 
                onClick={e => { 
                    e.stopPropagation()
                    if (decrementEventHandler) decrementEventHandler()
                }}
            >
            </div>
        </div>
    )
}

const ProgressBar = componentFromStream(prop$ => (
    prop$.pipe(
        switchMap(props => {
            const mappedIncrement$ = props.increment$
                .pipe(
                    map(inc => {
                        if (props.incrementSideEffect && props.level <= 100) {
                            props.incrementSideEffect()
                        }
                    }),
                    mapTo(props.incrementValue)
                )

            const callDecrementSideEffect = () => {
                if (props.decrementSideEffect && props.level > 0) {
                    props.decrementSideEffect()
                }

                return true
            }

            const mappedDecrement$ = props.decrement$
                .pipe(
                    map(dec => callDecrementSideEffect()),
                    mapTo(-1 * props.decrementValue),
                )

            const decayDuration = props.decayDuration || 100000000000000000

            const decay$ = interval(decayDuration)
                .pipe(
                    map(dec => callDecrementSideEffect()),
                    mapTo(props.level >= 0 ? (-1 * props.decrementValue) : 0)
                )

            const change$ = merge(mappedDecrement$, mappedIncrement$, decay$)

            return change$.pipe(
                startWith(props.level),
                scan((acc, change) => {
                    const complete = acc >= 100
                    const empty = acc <= 0 && change < 0
                    change = change > (100 - acc) ? 100 - acc : change
                    
                    if (complete && props.completeSideEffect) props.completeSideEffect()
                    if (empty && props.emptySideEffect) props.emptySideEffect()
                    return empty ? 0 : acc + (complete ? (-1 * acc) : change)
                }),
                map(level => ({ 
                    ...props,
                    level
                })),
                map(BarPresentational)
            )
        })
    )
))

export default ProgressBar