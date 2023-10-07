// import React from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useEffect, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { AuthContextApi } from "../context/AuthContext";
import CheckIcon from '@mui/icons-material/Check';

export const Search = ({onFocus}) => {
  const [search,setSearch] = useState('')
  // const [error,setError] = useState(false);
  const [user,setUser] = useState({})
  const [loading,setLoading] = useState(false);
  const [loading2,setLoading2] = useState(false);
  const [isFriend,setIsFriend] = useState(false);
  const {currentUser} = useContext(AuthContextApi)
  // console.log(currentUser);
  // useEffect(()=>{
      const handleSearch=async()=>{
      const citiesRef = collection(db, "users");
      const q = query(citiesRef, where("displayName", "==", search));
      try{
        setLoading(true);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data())
        });
        setLoading(false);
      }catch(e){
        setLoading(false);
        // setError(true)
      }
    }
  //   handleSearch();
  // },[search])
  useEffect(()=>{
    const f=async()=>{
      const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
      const res = await getDoc(doc(db,'chats',combinedId));
      if(res.exists()){
        setIsFriend(true);
      }
      }
      if(user?.uid)
        f();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
  const handleSelect=async()=>{
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try{
      setLoading2(true);
      const res = await getDoc(doc(db,'chats',combinedId));
      if(!res.exists()){
          // create a chat in chats collection
          await setDoc(doc(db,'chats',combinedId),{messages:[]})
          // create user chats
          await updateDoc(doc(db,'userChats',currentUser.uid),{
            [combinedId+'.userInfo']:{
              uid:user.uid,
              displayName:user.displayName,
              photoURL:user.photoURL
            },
            [combinedId+'.date'] : serverTimestamp()
          })
          await updateDoc(doc(db,'userChats',user.uid),{
            [combinedId+'.userInfo']:{
              uid:currentUser.uid,
              displayName:currentUser.displayName,
              photoURL:currentUser.photoURL
            },
            [combinedId+'.date'] : serverTimestamp()
          })
      }
      setUser(null)
      setSearch('')
      setLoading2(false);
    }catch(e){
      setLoading2(false);
      // setError(true);
    }
    setUser(null)
  }
  return (
    <div >
      <div className=" mx-6 flex items-center gap-3 mb-4 bg-[#2e343d] p-3 rounded-2xl border border-transparent ">
        <div onClick={handleSearch} className="cursor-pointer min-w-[30px] min-h-[30px] rounded-lg flex justify-center items-center bg-[#4b51f9]">
          {loading 
          ? 
          <SpinnerCircularFixed 
                className='mx-none'
                size={16} 
                thickness={180} 
                speed={100} 
                color="white" 
                secondaryColor="rgba(57, 172, 89, 0.1)" 
              /> 
          :
          <div className="mt-[-5px] relative min-w-[16px] min-h-[16px] border border-white rounded-full translate-y-[1px] translate-x-[-1px]">
            <span className="bottom-[-3px] right-[-1px] rotate-[-40deg] absolute h-[5px] w-[2px] bg-white"></span>
          </div>} 
        </div>
        <input onFocus={()=>onFocus()} value={search} onChange={(e)=>setSearch(e.target.value) } type="text" placeholder="Search" className="w-full text-sm outline-none bg-transparent h"/>
      </div>
      {(user?.uid && search) && <div  className="mx-3 mb-3  cursor-pointer  flex gap-3 transition bg-[#2e343d] p-3 rounded-3xl">
        <img className="rounded-2xl w-[45px] border border-[#2e343d] h-[45px] bg-white" src={user.photoURL} alt="" />
        <div className="flex-1 flex flex-row items-center justify-between">
          <p className=" text-white flex justify-between items-center pr-3">{user.displayName}</p>
          {user.uid!==currentUser.uid && (!isFriend ? <button onClick={handleSelect} disabled={loading2} className="text-[12px] text-white  font-medium p-2 rounded-lg bg-[#4b51f9] hover:scale-[0.98] transition">
          {loading2 
          ? 
          <SpinnerCircularFixed 
                className='mx-none mx-[26px] '
                size={12} 
                thickness={180} 
                speed={100} 
                color="white" 
                secondaryColor="rgba(57, 172, 89, 0.1)" 
              /> 
          :
            "Add Friend"
          }</button>:<span className="block text-[#4b51f9] font-medium"><CheckIcon style={{fontSize:16}}/> Friend</span>)
        }
        </div>
      </div>}
      <div className="mx-6 mb-3 border-b border-b-gray-500 "></div>
    </div>
  )
}
