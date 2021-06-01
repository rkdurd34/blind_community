import React, {useCallback} from 'react'
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import * as testActions from '../store/modules/test'

export default function Test() {
    const dispatch = useDispatch()

    const plus = useCallback(({count}) => {
        dispatch(testActions.increment({count}))}
        ,[dispatch]
    )

    const minus = useCallback(({count}) => {
            dispatch(testActions.decrement({count}))
        },[dispatch]
    )

    const count = useSelector(({test})=> test.count, shallowEqual)
    return (
        <div>
          <button onClick={()=>minus({count})}>-</button>
          <span>{count}</span>
          <button onClick={()=>plus({count})}>+</button>
        </div>
    )
}
