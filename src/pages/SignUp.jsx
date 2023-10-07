import { useState} from 'react'
// import {Link} from 'react-router-dom'
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db} from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link } from 'react-router-dom';
import { SpinnerCircularFixed } from 'spinners-react';


export const SignUp = () => {
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    // const navigate = useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]
        // console.log(file);
        try{
            setLoading(true);
            const res = await createUserWithEmailAndPassword(auth, email, password)
            if(file){
                const storageRef = ref(storage, displayName);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                () => {
                    setError(true)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                        await updateProfile(res.user,{
                            displayName,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, "users", res.user.uid), {
                            displayName,
                            uid:res.user.uid,
                            photoURL:downloadURL,
                            email
                        });
                        await setDoc(doc(db,'userChats',res.user.uid),{})
                    });
                    // console.log(currentUser)
                    // navigate('/chat-app/',{replace:true})
                }
                );
                
            }else{
                await updateProfile(res.user,{
                    displayName,
                })
                await setDoc(doc(db, "users", res.user.uid), {
                    displayName,
                    uid:res.user.uid,
                    photoURL:'null',
                    email
                });
                await setDoc(doc(db,'userChats',res.user.uid),{})
            }
            setLoading(false);
            // navigate('/chat-app/',{replace:true})
        }catch(e){
            setError(e.message)
            setLoading(false);
        }
        // navigate('/chat-app/',{replace:true})
    }

    return (
        <div className='bg-white p-6 rounded-3xl w-fit mx-auto mt-10 border '>
            <h1 className='text-center text-2xl font-medium text-gray-700 mb-10'>Sign Up</h1>
            {error && <span className='block text-center text-red-600 mb-3 font-medium'>SomeThing Went Wrong</span>}
            <form className='w-[320px] text-white' onSubmit={handleSubmit}>
                <label className='text-gray-600 font-medium mb-4 block'>
                    <div className='cursor-pointer ml-2 mb-2'>User Name</div>
                    <input required className='p-3 rounded-lg px-4 outline-blue-900 border-2  border-gray-200 w-full' type="text" />  
                </label>
                <label className='text-gray-600 font-medium mb-4 block'>
                    <div className='cursor-pointer ml-2 mb-2'>Email</div>
                    <input required className='p-3 rounded-lg px-4 outline-blue-900 border-2  border-gray-200 w-full' type="email" />  
                </label>
                <label className='text-gray-600 font-medium mb-4 block'>
                    <div className='cursor-pointer ml-2 mb-2'>Password</div>
                    <input required className='p-3 rounded-lg px-4 outline-blue-900 border-2  border-gray-200 w-full' type="password" />  
                </label>
                <label className='text-gray-600 font-medium mb-4 block'>
                    <div className='hover:text-gray-500 cursor-pointer ml-2 mb-2'>Upload a photo</div>
                    <input className='hidden' type="file" />  
                </label>
                <button className='font-medium w-full  bg-blue-950 hover:scale-[0.98] text-gray-200 p-3 rounded-lg border-2 transition border-blue-950 '>{loading 
                    ? 
                    <SpinnerCircularFixed 
                    className='mx-auto'
                    size={24} 
                    thickness={180} 
                    speed={100} 
                    color="gray" 
                    secondaryColor="rgba(57, 172, 89, 0.1)" 
                    /> 
                    : 'Signup'}
                </button>        
            </form>
            <div className='text-center mt-4 text-gray-500'>Already have and account? <Link to='/login' className='text-blue-600 font-medium'>Login</Link></div>
            
            {error && <div>error</div>}
        </div>
    )
}
