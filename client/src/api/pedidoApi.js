import axios from "./axios.js"

export const getPedidos = () => axios.get('/getPedidos')

export const addPedido = pedido => axios.post("/addPedido",pedido)

export const deletePedido = uid => axios.delete('/deletePedido/'+uid)

export const updatePedido = (uid, pedido) => axios.put('/updatePedido/'+uid, pedido)