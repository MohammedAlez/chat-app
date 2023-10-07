import { signInWithEmailAndPassword } from 'firebase/auth'
import {useState} from 'react'
import { Link, useNavigate} from "react-router-dom"
import { auth } from '../firebase'
import { SpinnerCircularFixed } from 'spinners-react';

export const Login = () => {
  const [error,setError] = useState(false)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const email = e.target[0].value
    const password = e.target[1].value
    try{
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
        setLoading(false);
        navigate('/',{replace:true})
    }catch(e){
        setError(e)
        setLoading(false);
    }
    
}
  return (
    <div className='bg-white p-6 rounded-3xl w-fit mx-auto mt-10 border '>
        <h1 className='text-center text-2xl font-medium text-gray-700 mb-10'>Login</h1>
        {error && <span className='block text-center text-red-600 mb-3 font-medium'>SomeThing Went Wrong</span>}
        <form className='w-[320px] text-white' onSubmit={handleSubmit}>
            <label className='text-gray-600 font-medium mb-4 block'>
                <div className='cursor-pointer ml-2 mb-2'>Email</div>
                <input required className='p-3 rounded-lg px-4 outline-blue-900 border-2  border-gray-200 w-full' type="email" />  
            </label>
            <label className='text-gray-600 font-medium mb-4 block'>
                <div className='cursor-pointer ml-2 mb-2'>Password</div>
                <input required className='p-3 rounded-lg px-4 outline-blue-900 border-2  border-gray-200 w-full' type="password" />  
            </label>
            <button className='font-medium w-full  bg-blue-950 hover:scale-[0.98] text-gray-200 p-3 rounded-lg border-2 transition border-blue-950 '>{loading 
            ? 
            <SpinnerCircularFixed 
              className='mx-auto'
              size={24} 
              thickness={180} 
              speed={100} 
              color="white" 
              secondaryColor="rgba(57, 172, 89, 0.1)" 
            /> 
            : 'Login'}</button>
        </form>
        <div className='text-center mt-4 text-gray-500'>Don&apos;t have and account? <Link to='/signup' className='text-blue-600 font-medium'>Sign up</Link></div>
    </div>
  )
}
