import axios from "./axios.js";

export const getClientes = () => axios.get('/getClientes')

export const addCliente = cliente => axios.post("/addCliente", cliente)

export const deleteCliente = uid => axios.delete("/deleteCliente/"+uid)

export const updateCliente = (uid, cliente) => axios.put("/updateCliente/"+uid, cliente)