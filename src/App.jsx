
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useContext } from 'react'
import {AuthContextApi} from './context/AuthContext'
function App() {
  const {currentUser} = useContext(AuthContextApi)
  // eslint-disable-next-line react/prop-types
  const Protector = ({children}) =>{
    // console.log(currentUser)
    if(Object.keys(currentUser).length===0) 
      return <Navigate to='/login' />
    else {
      // console.log(currentUser)
      return children
    }
  }
  // eslint-disable-next-line react/prop-types
  const AuthProtector = ({children})=>{
    
    if(Object.keys(currentUser).length!==0)
      return <Navigate to='/' />
    else {
      
      return children
    }
  }
  return (
      
        <BrowserRouter>
          <Routes>
            <Route path='/' >
              <Route index element={<Protector><Home /></Protector>} />
              <Route path='/login' element={<AuthProtector><Login /></AuthProtector>}/>
              <Route path='/signup' element={<AuthProtector><SignUp /></AuthProtector>}/>
            </Route>
          </Routes>
        </BrowserRouter>
  )
}

export default App
