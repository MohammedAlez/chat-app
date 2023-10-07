// import React from 'react'

import { Chat } from "../components/Chat"
import { SideBar } from "../components/SideBar"

export const Home = () => {
  return (
    // #2e343d
    <div style={{maxHeight:`${window.innerHeight}px`,minHeight:`${window.innerHeight}px`}} className={`text-gray-300 bg-[#202329]  flex flex-col md:flex-row font-myFont overflow-hidden lg:h-[90vh] max-w-[1000px] lg:mx-auto  p-2`}>
      <SideBar />
      <Chat />
    </div>
  )
}
