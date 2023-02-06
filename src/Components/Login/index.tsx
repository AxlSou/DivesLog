import React, { useState } from 'react'
import './index.scss'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { useAppDispatch } from '../../hooks'
import { auth } from '../../firebaseConfig'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { login } from '../../Features/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import Lottie from 'react-lottie'
import { defaultOptions } from '../Dives'
import GoogleIcon from '@mui/icons-material/Google';
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

const LogIn = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider();

  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: userAuth.user.displayName
            })
          )

          navigate('/dives')
        })
        .catch((error) => {
          console.log('user not updated')
        })
    }
  }

  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    dispatch(
      login({
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        token: token
      })
    )

    setDoc(doc(db, "DivesLog", user.uid), {user: user.displayName})

    navigate('/dives')
    
  })
  .catch((error) => {
    console.error(error.code);
    console.error(error.message);
    console.error(error.customData.email);
    console.error(GoogleAuthProvider.credentialFromError(error))
  });

  return (
    <div className="login-background">
      <div className="form-container">
        <Container>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign In</h2>
              <Form onSubmit={signIn}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </Form.Group>
                <Button className="w-100" type="submit" id='login-with-email'>
                  Sign In
                </Button>
                <Button className="w-100" onClick={() => signInWithPopup(auth, provider)}>
                  <GoogleIcon fontSize='small' /> Continue with Google
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up here!</Link>
          </div>
        </Container>
      </div>
      <div className='loader'>
        <Lottie options={defaultOptions} speed={0.5} />
      </div>
    </div>
  )
}

export default LogIn
