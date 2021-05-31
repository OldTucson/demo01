import React,{useContext} from 'react'
import {GoodsContext,UPDATE_GOODS} from '../store/goodsStore'
function Clerk(){
    const {dispatch} = useContext(GoodsContext)
    return (
        <div>
            <button onClick={() => {dispatch({type:UPDATE_GOODS,goods:'coffee'})}}>coffee</button>
            <button onClick={() => {dispatch({type:UPDATE_GOODS,goods:'cola'})}}>cola</button>
        </div>
    )
}

export default Clerk