import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase';

export const AuthContextApi = createContext();
// eslint-disable-next-line react/prop-types
export const AuthContext = ({children}) => {
    // const [isOpen,setIsOpen] = useState(false);
    const [currentUser,setCurrentUser] = useState({})
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            // console.log(user)
            setCurrentUser(user || {});
        })
        return ()=>{
            unsub();
        }
    },[])
    // console.log(currentUser)
    return (
        <AuthContextApi.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </AuthContextApi.Provider>
    )
}
