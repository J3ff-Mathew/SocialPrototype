import React, { useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import io from 'socket.io-client';
import { InputLabel, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:7001');

export default function AddPosts() {
    const navigate = useNavigate();
    const [fields, setFields] = useState({ title: '', body: '' });
    const [error, setError] = useState({ title: '', body: '' });
    const userdata = JSON.parse(localStorage.getItem('user'));
    const validate = () => {
        error.title = fields.title.length < 3 ? "title must be minimum of 3 charachters" : "";
        error.body = (fields.body.split(' ').length < 5) ? "body must be minimum of 5 words" : "";
        setError({ ...error });
        if (error.title == '' && error.body == '') {
            let data = { username: userdata.name, userid: userdata.userid, title: fields.title, body: fields.body }
            socket.emit('addpost', data);
            navigate('/dash')
        }
    };
    return (
        <div className='d-flex justify-content-center  align-items-center' style={{ height: "80vh" }}>
            <Form style={{ width: "70%", padding: '1.5rem' }}>

                <Row>
                    <Form.Group className='mt-2' controlId="formBasicEmail">
                        <InputLabel>Enter Post Title</InputLabel>
                        <TextField id="standard-basic" style={{ width: '100%' }} label="" onChange={e => setFields({ ...fields, title: e.target.value })} variant="standard" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Text className="text-danger">
                        {error.title}
                    </Form.Text>
                </Row>
                <Row>
                    <Form.Group controlId="formBasicEmail">
                        <InputLabel>Enter Post Body</InputLabel>
                        <TextField id="standard-basic" style={{ width: '100%' }} label="" onChange={e => setFields({ ...fields, body: e.target.value })} variant="standard" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Text className="text-danger">
                        {error.body}
                    </Form.Text>
                </Row>
                <Button className="mb-2" variant="contained" color='primary' onClick={() => validate()}>Add Posts</Button>
            </Form>
        </div>
    )
}
