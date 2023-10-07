import { useEffect, useState } from 'react';
import { Chats } from './Chats'
import { NavBar } from './NavBar'
import { Search } from './Search'
import MenuIcon from '@mui/icons-material/Menu';


export const SideBar = () => {
  // const {isOpen,setIsOpen} = useContext(AuthContextApi)
  const [isOpen,setIsOpen] = useState(window.innerWidth >= 768 ? true : false);
  useEffect(()=>{
    const f = ()=>{
        setIsOpen(window.innerWidth >= 768);
    }
    window.addEventListener('resize',f)
    return ()=>{
      window.removeEventListener('resize',f)
    }
  },[])
  const handleSearchFocus = () => {
    setIsOpen(true);
  };
  return (
    <>
      <span onClick={()=>setIsOpen(true)} className='absolute top-5 left-6 rounded-full md:hidden flex justify-center items-center w-[40px] h-[40px] hover:bg-[#2e343d] duration-300 transition cursor-pointer'><MenuIcon style={{fontSize:30}}/></span>  
      <div style={{transition:'0.3s',left:isOpen ? 0 : -1000}} className={`z-[11] p-2 py-6 flex-1 md:relative top-0  fixed w-[320px] bg-[#202329]  h-full`}>
        <NavBar />
        <Search onFocus={handleSearchFocus}/>
        <Chats isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
      {/* overlay */}
      {isOpen && <div className=' top-0 left-0 md:hidden fixed h-full w-full bg-[#000000a6] z-10' onClick={()=>setIsOpen(false)}></div>}
    </>
  )
}
