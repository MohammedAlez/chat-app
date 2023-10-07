// import React from 'react'
import VideocamIcon from '@mui/icons-material/Videocam';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Messages } from './Messages';
import { useContext } from 'react';
import { ChatContextApi } from '../context/ChatContext';
// import { Input } from './Input';
// import MenuIcon from '@mui/icons-material/Menu';
// import { AuthContextApi } from '../context/AuthContext';

export const Chat = () => {
  const {state} = useContext(ChatContextApi)
  // const {setIsOpen} = useContext(AuthContextApi)
  // console.log(state);   
  return (
      
    
      <div style={{minHeight:`calc(${window.innerHeight}px - 48px)`}} className={`flex-[2] p-2 md:px-4 bg-[#1b1d23] rounded-md`}>
          <div className="p-1 flex  justify-between items-center max-h-[48px]">
            <p className='ml-16 md:ml-0 flex items-center gap-3'>
              {/* <span onClick={()=>setIsOpen(true)} className='rounded-full md:hidden flex justify-center items-center w-[40px] h-[40px] hover:bg-[#2e343d] duration-300 transition cursor-pointer'><MenuIcon style={{fontSize:30}}/></span> */}
              {state.user?.displayName}
            </p>
            {state?.chatId!=="null" && <div className="flex gap-3">
              <span className="cursor-pointer block p-2 rounded-full hover:bg-[#2e343d]"><VideocamIcon /></span>
              {/* <span className="cursor-pointer block p-2 rounded-full hover:bg-[#2e343d]"><PersonAddAlt1Icon /></span> */}
            </div>}
          </div>
          {state?.chatId!=="null" ?
            <>
              <Messages />
            </>
          : <div style={{minHeight:`calc(${window.innerHeight}px - 48px)`}} className={`md:flex-[2]  h-full p-2 px-4 flex justify-center items-center`}>Choose a chat to start</div>}
      </div> 
      
   
    
  )
}
