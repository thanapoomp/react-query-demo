import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Player from '../components/reduxDemo/Player'
import Room from '../components/reduxDemo/Room'
import GameConfig from '../components/reduxDemo/GameConfig'
import * as demoRedux from '../_redux/demoRedux'


function ReduxDemo() {
    const dispatch = useDispatch()
    const demoReducer = useSelector(({ demo }) => demo)
    const handleReset = () => {
        dispatch(demoRedux.actions.reset())
    }
    return (
        <div>
            <GameConfig></GameConfig>
            <Room></Room>
            {
                demoReducer.playerList.map((item, index) => (
                    <Player key={index} name={item}></Player>
                ))
            }
            <button onClick={handleReset}>reset</button>
        </div>
    )
}

export default ReduxDemo
