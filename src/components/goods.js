import React,{useContext} from 'react'
import {GoodsContext} from '../store/goodsStore'
function Goods(){
    const {goods} = useContext(GoodsContext)
    return (
        <div style={{goods}}>
            已选择商品{goods}
        </div>
    )
}
export default Goods