import React from 'react'
import Clerk from '../components/clerk'
import Goods from '../components/goods'
import {GoodsStore} from '../store/goodsStore'

function Shop(){
    return (
        <GoodsStore>
            <Goods/>
            <Clerk/>
        </GoodsStore>
    )
}

export default Shop