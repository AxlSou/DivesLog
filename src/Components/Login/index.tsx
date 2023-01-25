import React, { useState } from 'react'
import './index.scss'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { useAppDispatch } from '../../hooks'
import { auth } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { login } from '../../Features/userSlice'
import { Link, useNavigate } from 'react-router-dom'

const LogIn = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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

  return (
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
              <Button className="w-100" type="submit">
                Sign In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up here!</Link>
        </div>
      </Container>
    </div>
  )
}

export default LogIn
