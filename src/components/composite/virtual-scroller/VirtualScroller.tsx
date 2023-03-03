import React, { Component, useCallback, useEffect, useRef, useState } from 'react'
import './style.scss';

interface VirtualScrollerSetting{
    itemHeight: number, 
    amount: number, 
    tolerance: number,
    minIndex: number, 
    maxIndex: number, 
    startIndex: number
}

const setInitialState = (settings: VirtualScrollerSetting) => {
    const { itemHeight, amount, tolerance, minIndex, maxIndex, startIndex } = settings
    const viewportHeight = amount * itemHeight
    const totalHeight = (maxIndex - minIndex + 1) * itemHeight
    const toleranceHeight = tolerance * itemHeight
    const bufferHeight = viewportHeight + 2 * toleranceHeight
    const bufferedItems = amount + 2 * tolerance
    const itemsAbove = startIndex - tolerance - minIndex
    const topPaddingHeight = itemsAbove * itemHeight
    const bottomPaddingHeight = totalHeight - topPaddingHeight
    const initialPosition = topPaddingHeight + toleranceHeight

    const data: any = [];

    return {
        settings,
        viewportHeight,
        totalHeight,
        toleranceHeight,
        bufferHeight,
        bufferedItems,
        topPaddingHeight,
        bottomPaddingHeight,
        initialPosition,
        data
    }
}

interface VirtualScrollerProps{
    settings: VirtualScrollerSetting,
    row: any,
    get: any
}

export default (props: VirtualScrollerProps) => {
    const [state, setState] = useState(setInitialState(props.settings))
    const viewportElement = useRef(null);

    useEffect(() => {
        if (viewportElement && viewportElement.current){
            const { initialPosition } = state;
            viewportElement.current.scrollTop = initialPosition
            if (initialPosition) {
                runScroller({ target: { scrollTop: 0 } })
            }
        }
    }, []);

    const runScroller: any = useCallback((e: any) => {
        const { target } = e;
        const { scrollTop } = target;
        const { totalHeight, toleranceHeight, bufferedItems, settings: { itemHeight, minIndex } } = state
        const index = minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight)
        const data = props.get(index, bufferedItems)
        const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0)
        const bottomPaddingHeight = Math.max(totalHeight - topPaddingHeight - data.length * itemHeight, 0)

        setState({
            ...state,
            topPaddingHeight,
            bottomPaddingHeight,
            data
        })
    }, []);

    const { viewportHeight, topPaddingHeight, bottomPaddingHeight, data } = state;

    return (
        <div
            className="viewport"
            ref={viewportElement}
            onScroll={runScroller}
            style={{ height: viewportHeight }}
        >
            <div style={{ height: topPaddingHeight }}></div>
            {
                data.map(props.row)
            }
            <div style={{ height: bottomPaddingHeight }}></div>
        </div>
    )
}

