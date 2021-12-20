import React, { useState } from 'react';
import logo from '../images/logo.png'
import { Link } from 'react-router-dom';
import { Container, Form, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField, Input, InputAdornment, IconButton, InputLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { addUser } from '../config/axiosPaths';


export default function Registration() {
    const navigate = useNavigate();
    const regexuser = RegExp(/^[A-Za-z0-9._-]{3,18}$/);
    const regexname = RegExp(/^[A-Za-z]{2,30}$/);
    const regexpass = RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()]).{8,}");
    const [viewpass1, setViewpass1] = useState(false);
    const [viewpass2, setViewpass2] = useState(false);
    const [details, setDetails] = useState({ lname: '', fname: '', userid: '', pass: '', cpass: '' });
    const [error, setError] = useState({ name: '', userid: '', pass: '', cpass: '', fields: '' });
    const [show, setShow] = useState(false);

    const validate = async () => {
        if (details.lname == '' || details.fname == '' || details.userid == '' || details.pass == '' || details.cpass == '') {
            setError({ ...error, fields: 'All fields are necessary' });
            setShow(true);
        }
        else {
            console.log(!regexuser.test(details.userid));
            console.log(details.userid)
            error.fields = '';
            error.name = (!regexname.test(details.lname) || !regexname.test(details.fname)) ? "Name Fields should contain a minimum of 3 characters and should contain only alphabets" : "";
            error.userid = (!regexuser.test(details.userid)) ? "Enter valid Userid" : "";
            error.pass = (!regexpass.test(details.pass)) ? "Password should must have atlesr 8 characters be Alphanumeric and contain 1 uppercase & 1 lowercase with a special char" : "";
            error.cpass = (details.pass != details.cpass) ? "Password and confirm password must be same" : "";
            setError({ ...error })
            if (error.name == "" && error.userid == "" && error.cpass == "" && error.pass == "" && error.fields == "") {
                console.log("in console on error");
                let data = { name: `${details.fname} ${details.lname}`, userid: details.userid, password: details.pass }
                await addUser(data).then(res => {
                    setError({ ...error, fields: res.data.error });
                    if (!res.data.error)
                        navigate('/')
                    else
                        setShow(true);
                });


            }
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
                            <h1 className="my-5">Connect With The World With Your Thoughts</h1>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <TextField id="standard-basic" style={{ width: '70%' }} label="Enter first name" onChange={e => setDetails({ ...details, fname: e.target.value })} variant="standard" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <TextField id="standard-basic" style={{ width: '70%' }} label="Enter Last name" onChange={e => setDetails({ ...details, lname: e.target.value })} variant="standard" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Form.Text className="text-danger">
                                    {error.name}
                                </Form.Text>
                            </Row>
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
                            <Row >
                                <Form.Group className="mb-3" >

                                    <InputLabel>Confirm Password</InputLabel>
                                    <Input
                                        style={{ width: '50%' }}
                                        label="Confirm Password"

                                        type={viewpass2 ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => { setViewpass2(!viewpass2) }}
                                                    edge="end"
                                                >
                                                    {viewpass2 ? <VisibilityOff color='error' /> : <Visibility color='dark' />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        lable="Confirm Password"
                                        onChange={e => setDetails({ ...details, cpass: e.target.value })}
                                    />




                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Text className="text-danger">
                                    {error.cpass}
                                </Form.Text>
                            </Row>
                            <Button className="mx-1 mb-4" variant="contained" onClick={() => validate()} >Register</Button>

                            <br />
                            <span className='text-white'>Already have an Account?</span><Link style={{ color: 'blue ' }} to="/">Login Over Here</Link>
                            {/* {pflag == 1 && <Navigate to='/' />} */}

                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}
