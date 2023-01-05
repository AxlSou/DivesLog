import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks'
import { login, logout } from './Features/userSlice'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import About from './Components/About'
import Dives from './Components/Dives'
import Home from './Components/Home'
import Layout from './Components/Layout'
import LogIn from './Components/Login'
import SignUp from './Components/SignUp'

function App () {
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      console.log(userAuth)
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL
          })
        )
      } else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/dives" element={<Dives />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  )
}

export default App
