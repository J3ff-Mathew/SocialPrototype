import React, { useRef, useState, useEffect } from 'react';
import logo from '../images/logo.png'
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Container, Form, FormControl, FormLabel, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField, Input, InputAdornment, IconButton, InputLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getUser } from '../config/axiosPaths';

export default function Login() {
    const navigate = useNavigate();
    const [viewpass1, setViewpass1] = useState(false);
    const [details, setDetails] = useState({ userid: '', pass: '' });
    const [error, setError] = useState({ userid: '', pass: '' });
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('user') != undefined) {
            navigate('/dash')
        }
    }, [])
    const validate = async () => {
        if (details.userid == '' || details.pass == '') {
            setError({ ...error, fields: 'All fields are necessary' });
            setShow(true);
        }
        else {
            getUser(details.userid, details.pass).then(res => {
                console.log(res.data.error != '');
                console.log(res.data.error)
                if (res.data.error != '') {
                    setError({ ...error, fields: res.data.error });
                    setShow(true);
                }
                else {
                    const details = res.data.local;
                    localStorage.setItem('user', JSON.stringify(details));
                    navigate('/dash');
                }
            })
        }
    }
    return (
        <div id='formpage'>
            <header id="main-header">
                <section className='d-flex align-items-center'>
                    <img src={logo} alt="SochVichar_logo" style={{ borderRadius: '40%' }} />
                    <h1>SochVichar</h1>
                </section>
            </header>
            {show && <Alert id="alert" variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Oh snap! You some an error!</Alert.Heading>
                <p>
                    {error.fields}
                </p>
            </Alert>}
            <Container style={{ marginTop: "10%" }} >

                <Row >
                    <Col>
                        <Form className='text-center'>
                            <h1 className="my-5">It's Great To Share Opinion</h1>
                            <Row >
                                <Form.Group controlId="formBasicEmail">
                                    <TextField id="standard-basic" style={{ width: '70%' }} label="Enter User-ID" onChange={e => setDetails({ ...details, userid: e.target.value })} variant="standard" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Text className="text-danger">
                                    {error.userid}
                                </Form.Text>
                            </Row>
                            <Row >
                                <Form.Group className="mb-3">
                                    <InputLabel>Password</InputLabel>

                                    <Input
                                        type={viewpass1 ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => { setViewpass1(!viewpass1) }}
                                                    edge="end"

                                                >
                                                    {viewpass1 ? <VisibilityOff color='error' /> : <Visibility color='dark' />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        onChange={e => setDetails({ ...details, pass: e.target.value })}

                                        lable="Password"
                                        style={{ width: '50%' }}
                                    />

                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Text className="text-danger">
                                    {error.pass}
                                </Form.Text>
                            </Row>
                            <Button className="mx-1 mb-4" variant="contained" onClick={() => validate()} >Login</Button>

                            <br />
                            <span className='text-white'>New To Platform?</span><Link style={{ color: 'blue ' }} to="/regis">Register Over Here</Link>

                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}
