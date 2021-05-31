import React,{createContext,useReducer} from 'react'

export const GoodsContext = createContext({})

export const UPDATE_GOODS = "UPDATE_GOODS"

const reducer = (state,action) => {
    switch(action.type){
        case UPDATE_GOODS:
            return action.goods
        default:
            return state
    }
}

export const GoodsStore = props => {
    const [goods,dispatch] = useReducer(reducer,'coffee')
    return (
        <GoodsContext.Provider value={{goods,dispatch}}>
            {props.children}
        </GoodsContext.Provider>
    )
}