import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Card, Button, Modal, ListGroup, Form } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
const socket = io('http://localhost:7001');

export default function Home() {
    const [post, setPost] = useState([]);
    const [modalShow, setModalShow] = useState({ state: false, comments: [] });
    let details = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        socket.emit('getpost')
        socket.on('sendpost', (data) => {
            console.log(data)
            setPost(data);


        });

    }, [])
    const sendComment = (id) => {
        console.log(id)
        let input = document.getElementById('input');
        let data = { id: id, name: details.name, userid: details.userid, comment: input.value }
        if (input.value) {
            socket.emit('comment', data);
            input.value = '';


            socket.on('getcomment', (commentdata) => {
                console.log("in get commnet")
                console.log(commentdata);
                if (modalShow.id == commentdata.id) {
                    console.log(commentdata)
                    setModalShow({ ...modalShow, comments: [...commentdata.comments] });
                }
            })
        }
    }
    socket.on('getcomment', (commentdata) => {
        console.log("in get commnet")
        console.log(commentdata);
        if (modalShow.id == commentdata.id) {
            console.log(commentdata)
            setModalShow({ ...modalShow, comments: [...commentdata.comments] });
        }
    })
    return (
        <div>
            {post != [] && post.map(ele =>
                <Card className='my-1'>
                    <Card.Header className='d-flex justify-content-between'> <span className='d-flex align-items-center'><Avatar sx={{ bgcolor: deepOrange[500] }}>{ele.username[0]}</Avatar>{ele.username}</span><span style={{ fontSize: '0.6rem' }}>{ele.date}</span></Card.Header>
                    <Card.Body className=' text-center'>
                        <Card.Title>{ele.title}</Card.Title>
                        <Card.Text>
                            {ele.body}
                        </Card.Text>
                        <Button variant="primary" onClick={() => setModalShow({ comments: ele.comments, state: true, id: ele._id })}>See Comment</Button>
                    </Card.Body>
                </Card>
            )}

            <Modal
                show={modalShow.state}
                onHide={() => setModalShow({ ...modalShow, state: false })}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {modalShow.comments.map(ele =>

                            <ListGroup.Item>
                                <Card className='my-4 '>
                                    <Card.Header className='d-flex justify-content-between'> <span className='d-flex align-items-center'><Avatar>{ele.name[0]}</Avatar>{ele.name}</span><span style={{ fontSize: '0.6rem' }}>{ele.date}</span></Card.Header>
                                    <Card.Body className=' text-center'>

                                        <Card.Text>
                                            {ele.comment}
                                        </Card.Text>

                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>

                        )}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Form className='d-flex'>
                        <Form.Control id='input' type="text" placeholder="Enter Your Comment" />'
                        <Button variant="primary" type="button" onClick={() => sendComment(modalShow.id)}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
