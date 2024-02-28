import axios from "./axios"

export const getMuebles = () => axios.get('/getMuebles')

export const addMueble = mueble => axios.post('/addMueble', mueble)

export const deleteMueble = (uid) => axios.delete("/deleteMueble/"+uid)

export const updateMueble = (uid, mueble) => axios.put("/updateMueble/"+uid, mueble)