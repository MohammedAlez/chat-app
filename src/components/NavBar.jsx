// import React from 'react'
import { signOut, updateProfile } from "firebase/auth"
import { auth, db, storage } from "../firebase"
import { useContext, useEffect, useState } from "react"
import { AuthContextApi } from "../context/AuthContext"
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";


export const NavBar = () => {
  const {currentUser} = useContext(AuthContextApi);
  const [file,setFile] = useState(null)
  // console.log(currentUser);
  // const handleUpdatePhoto =async(e)=>{
  //   setFile(e.target.files[0])
  //   try{  
  //     const storageRef = ref(storage, currentUser?.displayName);
  //     const uploadTask = uploadBytesResumable(storageRef, file);
  //     uploadTask.on(
  //     () => {
  //         // setError(true)
  //     }, 
  //     () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
  //             await updateProfile(currentUser,{
  //                 photoURL: downloadURL
  //             })
  //             await updateDoc(doc(db, "users", currentUser?.uid), {
  //                 photoURL:downloadURL
  //             });
  //         });
  //         // console.log(currentUser)
  //         // navigate('/chat-app/',{replace:true})
  //     }
  //     )
  //     console.log(currentUser)
  //   }catch(e){
  //       // console.log(e)
  //   }
  // }
  // useEffect(()=>{
  //   setIsChange()
  // },[file])
  useEffect(()=>{
    const handleUpdatePhoto =async()=>{
      if(file){
      try{  
        const storageRef = ref(storage, currentUser?.displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
        () => {
            // setError(true)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                await updateProfile(currentUser,{
                    photoURL: downloadURL
                })
                await updateDoc(doc(db, "users", currentUser?.uid), {
                    photoURL:downloadURL
                });
            });
            // console.log(currentUser)
            // navigate('/chat-app/',{replace:true})
        }
        )
        console.log(currentUser)
      }catch(e){
          // console.log(e)
      }
    }
    }
    handleUpdatePhoto()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[file])
  return (
    <>
      <div className='flex justify-between items-center mb-4 '>
          <div className='flex gap-3 items-center'>
              <label>
                <input onChange={(e)=>setFile(e.target.files[0])} type="file" className="hidden" name="" id="" />
                <div className="relative" title="upload a photo">
                  <span className="absolute top-0 left-0 opacity-0 w-[50px] h-[50px] rounded-full hover:opacity-70 transition bg-black flex justify-center items-center"><FileUploadIcon style={{fontSize:25,color:'white'}}/></span>
                  {currentUser?.photoURL ? <img className='w-[50px] h-[50px] bg-white rounded-full' src={currentUser?.photoURL} alt="" /> : <AccountCircleIcon style={{fontSize:50}}/>}</div>
              </label>
              <div className='flex flex-col '>
                  <p className='text-sm'>{currentUser?.displayName}</p>
                  <p className='text-sm'>{currentUser?.email}</p>
              </div>
          </div>
          <button onClick={()=>signOut(auth)} className="text-sm p-2 rounded-xl hover:scale-[0.96] font-medium text-white transition bg-red-600"><LogoutIcon /></button>
      </div>
    </>
  )
}