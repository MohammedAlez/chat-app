// import React from 'react'

import { useContext, useEffect, useState } from "react"
import { AuthContextApi } from "../context/AuthContext"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContextApi } from "../context/ChatContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// eslint-disable-next-line react/prop-types
export const Chats = ({isOpen,setIsOpen}) => {
  const {currentUser} = useContext(AuthContextApi);
  const {dispatch,state} = useContext(ChatContextApi);
  const [chats,setChats] = useState([]);
  useEffect(()=>{
    const handleChats=()=>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        // console.log(doc.data())
        setChats(doc.data());
      });
      return ()=>{
        unsub()
      }
    }
    if(currentUser.uid)
      handleChats()
  },[currentUser])
  // console.log(Object.entries(chats));
  // console.log(chats)
  const selectChat=async(u)=>{
    await dispatch({type:'CHANGE_USER',payload:u.userInfo})
    if(window.innerWidth <768 && isOpen){
      setIsOpen((prev)=>!prev);
    }
  }
  return (
//     (a:1,b:2) => a-b 1-2 return negative a before b => [1,2]
//     (a:1,b:2) => b-a 2-1 return positive b before a => [2,1]

    <div className="overflow-auto h-fit md:h-[70%] ">
      
      {chats ? Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>{
        const date = new Date(chat[1].date?.seconds * 1000)
        // {chat[1].lastMessage?.text && <span className="text-[12px] ">{`${date.getHours()}:${date.getMinutes()}`}</span>}
        // console.log((chat[1]))
        // console.log(date);
        // ${!chat[1].isRead ? 'bg-[#2e343d]' : 'transparent'}
        return (
      <div key={chat[0]} onClick={()=>selectChat(chat[1])} className={` mx-3 mb-3 cursor-pointer  flex gap-3 transition hover:bg-[#2e343d] p-3 rounded-3xl ${chat[1]?.userInfo?.uid === state?.user?.uid ? 'bg-[#2e343d]' : 'transparent'}`}>
        <div className="h-[45px] w-[45px] flex justify-center items-center">{chat[1].userInfo?.photoURL ? <img className="rounded-2xl w-[45px] border border-[#2e343d] h-[45px] bg-white" src={chat[1].userInfo.photoURL} alt="" /> : <AccountCircleIcon style={{fontSize:45}}/>}</div>
        <div className="flex-1 flex flex-col justify-between">
          <p className="text-sm text-white flex justify-between items-center pr-3">{chat[1].userInfo.displayName}{chat[1].lastMessage?.text && <span className="text-[12px] ">{`${date.getHours()}:${date.getMinutes()}`}</span>}</p>
          <p className="text-[13px] text-gray-400 font-medium">{chat[1].lastMessage?.text?.substring(0,window.innerWidth >= 960 ? 20 : 13)}</p>
        </div>
      </div>
    )})
    :<span className='block mx-3 text-center'>There is no chat yet</span>}
    </div>
  )
}
