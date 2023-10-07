// import React from 'react'
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { db, storage } from '../firebase';
import { ChatContextApi } from '../context/ChatContext';
import { v4 as uuid } from 'uuid';
import { AuthContextApi } from '../context/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
export const Input = () => {
  const [msg,setMsg] = useState('');
  const [img,setImg] = useState(null)
  const {state} = useContext(ChatContextApi);
  const {currentUser} = useContext(AuthContextApi);
  const handleSend=async()=>{
    // console.log(currentUser.uid)
    // console.log(state.chatId)
    
      if(img){
              const storageRef = ref(storage, uuid());
              const uploadTask = uploadBytesResumable(storageRef, img);
              uploadTask.on(
              () => {
                  // setError(true)
              }, 
              () => {
                  getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    await updateDoc(doc(db,'chats',state.chatId),{
                      messages: arrayUnion({
                        id:uuid(),
                        text: msg?.trim().length === 0 ? null : msg,
                        senderId:currentUser.uid,
                        img:downloadURL,
                        date:Timestamp.now()
                      })
                    })
                  });
              }
              );
      }else{
        const chatRef = doc(db,'chats',state.chatId);
        // console.log(Timestamp().now())
        await updateDoc(chatRef,{
          messages: arrayUnion({
            id:uuid(),
            text:msg?.trim().length === 0 ? null : msg,
            senderId:currentUser.uid,
            date:Timestamp.now()
          })
        })
      }
      await updateDoc(doc(db,'userChats',currentUser.uid),{
        [state.chatId + '.lastMessage']:msg?.trim().length === 0 ? {text:'photo'} : {text:msg}, 
        [state.chatId + '.date']:serverTimestamp(),
      })
      await updateDoc(doc(db,'userChats',state.user.uid),{
        [state.chatId + '.lastMessage']:msg?.trim().length === 0 ? {text:'photo'} : {text:msg},
        [state.chatId + '.date']:serverTimestamp(),
        // [state.chatId + '.isRead']:false
      })
      setImg(null);
      setMsg('')
    }
  // console.log(state)
  const handleKey=(e)=>{
    (e.code === 'Enter' && msg?.trim().length !== 0) && handleSend()
  }
  return (
    // state?.chatId!=="null" ? 
    <div className="p-2 gap-2 md:gap-3 flex items-center relative">
      {/* <div className="flex items-center gap-2 md:gap-3 "> */}
          {/* <span className=''>
            <AttachFileIcon />
          </span> */}
          <label className='cursor-pointer'>
            <input type="file" name="" className='hidden ' onChange={(e)=>setImg(e.target.files[0])} id="" />
            <ImageIcon />
          </label>
          <input onKeyDown={handleKey} value={msg} onChange={(e)=>setMsg(e.target.value)} 
            className='bg-[#2e343d] pr-14 mr-14 py-2 px-3 transition duration-500 rounded-[30px] p-3 h-full flex-1 outline-none' 
            placeholder='Type something...' 
            type="text" 
          />   
      {/* </div>   */}
      <button onClick={handleSend}
          disabled={(msg?.trim().length === 0 && !img) ? true : false}
          className={`${(msg?.trim().length === 0 && !img)? 'bg-[#4b51f9cf]' : 'bg-[#4b51f9]'} absolute top-2 right-2 transition-[0.3s] hover:scale-95  p-5 rounded-full flex-1 min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] flex justify-center items-center`}>
          <SendIcon style={{fontSize:22}}/>
        </button>
    </div>
    // : null
  )
}
