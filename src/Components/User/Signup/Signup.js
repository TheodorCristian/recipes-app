import React, {useRef, useState} from 'react'
import { Card, Button, Container, Form, Alert } from 'react-bootstrap';
import "./Signup.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const {signup} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let history = useHistory();

    function redirectAfterSignUp() {
        history.push("/login");
    }
    async function handleSubmit (e) {
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match');
        }
        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        }
        catch (error) {
            setError('Failed to create an account');
            console.log(error)
        }
        setLoading(false);
        redirectAfterSignUp();
    }

    return (
        <>
            <Container className="w-100 sign-up-container" style={{minHeight: '100vh'}}>
                <div className="w-100 mb-4 d-flex align-items-center justify-content-center card-container">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center ">Sign Up</h2>
                            {error && <Alert variant='danger'>{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" ref={confirmPasswordRef} required />
                                </Form.Group>
                                <Button disabled={loading} type="submit">Create Account</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        <p>Already have an account? <Link to="/login">Log In</Link></p>
                    </div>
                </div>
                </Container>
        </>
    )
}


export default Signup
