import { createContext, useReducer } from 'react'

const INIATIAL_STATE ={
    city:undefined,
    date:[],
    options:{
        adult:undefined,
        children:undefined,
        room:undefined
    }
}

export const SearchContext = createContext(INIATIAL_STATE)

const SearchReducer = (state,action)=>{
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH":
            return INIATIAL_STATE
        default:
            return state
    }
}

export const SearchContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(SearchReducer,INIATIAL_STATE)
    return (
        <SearchContext.Provider value={{city:state.city,date:state.date,option:state.option,dispatch}}>
            {children}
        </SearchContext.Provider>
    )
}