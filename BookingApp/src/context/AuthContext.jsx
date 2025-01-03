import { createContext, useEffect, useReducer } from 'react'

const INIATIAL_STATE ={
    user:JSON.parse(localStorage.getItem("user")) || null,
    loading:false,
    error:false
}

export const AuthContext = createContext(INIATIAL_STATE)



const AuthReducer = (state,action)=>{
    switch (action.type) {
        case "LOGIN_START":
            return {user:null,loading:true,error:false}
        case "LOGIN_SUCCESS":
            return {user:action.payload,loading:false,error:false}
        case "LOGIN_FAILURE":
            return {user:null,loading:false,error:action.payload}
        case "LOGOUT":
            return {user:null,loading:false,error:false}
        
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducer,INIATIAL_STATE)
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])
    return (
        <AuthContext.Provider value={{user:state.user,loading:state.loading,error:state.error,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}