import { createContext, useContext, useEffect, useReducer } from 'react'
import { AuthContextApi } from './AuthContext';

export const ChatContextApi = createContext();
// eslint-disable-next-line react/prop-types
export const ChatContext = ({children}) => {
    const {currentUser} = useContext(AuthContextApi)
    const initialUser = {
        user:{},
        chatId:'null'
    }
    const chatReducer=(state,action)=>{
        switch(action.type){
            case 'CHANGE_USER' : 
                return {
                    user:action.payload,
                    chatId : currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                }
            case 'RESET' : 
                return initialUser
            default : return state
        }
    }
    const [state,dispatch] = useReducer(chatReducer,initialUser)
    useEffect(()=>{
        dispatch({type:'RESET'})
    //   eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentUser?.uid])
    return (
        <ChatContextApi.Provider value={{state,dispatch}}>
            {children}
        </ChatContextApi.Provider>
    )
}
