import axios from 'axios';

const URL = axios.create({ baseURL: "http://localhost:7000" });

export const addUser = data => URL.post('/adduser', data);

export const getUser = (userid, pass) => URL.get(`/getuser/${userid}/${pass}`)
