import React, { useState } from 'react'
import '../Login/index.scss'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { useAppDispatch } from '../../hooks'
import { auth } from '../../firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { login } from '../../Features/userSlice'
import { useNavigate, Link } from 'react-router-dom'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

const SignUp = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [name, setName] = useState<string>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name) {
      return alert('Please enter a full name')
    }

    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
          updateProfile(userAuth.user, {
            displayName: name,
          })
            .then(() =>
              dispatch(
                login({
                  email: userAuth.user.email,
                  uid: userAuth.user.uid,
                  displayName: name,
                })
              )
            )
            .then(() => {
              setDoc(doc(db, "DivesLog", userAuth.user.uid), {user: userAuth.user.displayName})
            })
            .catch((error) => {
              console.log('user not updated')
            })

          navigate('/dives')
        })
        .catch((error) => {
          alert(error)
        })
    }
  }

  return (
    <div className="form-container">
      <Container>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form onSubmit={register}>
              <Form.Group id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </Form.Group>
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
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" required />
              </Form.Group>
              <Button className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </Container>
    </div>
  )
}

export default SignUp
