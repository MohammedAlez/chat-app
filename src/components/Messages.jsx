// import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react';
import {Message} from './Message'
import { ChatContextApi } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Input } from './Input';
export const Messages = () => {
  const [messages,setMessages] = useState([]);
  const {state} = useContext(ChatContextApi);
  const ref = useRef();
  // const [loading,setLoading] = useState(false);
  // console.log(state.chatId);
  useEffect(()=>{
      const unsub =  onSnapshot(doc(db,'chats',state.chatId),(doc)=>{
        doc.exists() ?  setMessages(doc.data().messages) : setMessages([])
      })
      return ()=>{
        unsub()
      }
  },[state.chatId]);
useEffect(()=>{
  ref.current.scrollTop = ref.current.scrollHeight
},[messages])

  return (
    <div style={{height:`calc(${window.innerHeight}px - 64px)`}} className='py-2'>
      <div  style={{height:'calc(100% - 64px)'}} className='mt-[2px] md:mt-0  p-2 flex justify-end flex-col' >
          {/* {(!loading) &&  */}
          <div ref={ref} className='h-fit overflow-auto'>{
            messages?.length!==0 ? messages?.map((m)=>
                      (m.text || m.img) ? <Message key={m.id} message={m} /> : null
                    )
          :<div className='flex justify-center items-center my-20'>No Chat yet</div>
          }</div>
          {/* // } */}
      </div>
      <Input />
    </div>
  )
}
