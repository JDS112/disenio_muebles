import axios from "./axios.js"

export const loginReq = user => axios.post('/login', user)

export const getUsers = () => axios.get('/users')

export const addEmpleado = user => axios.post('/register', user)

export const deleteEmpleado = uid => axios.delete('/users/' + uid)

export const updateEmpleado = (uid, user) => axios.put('/users/' + uid, user)