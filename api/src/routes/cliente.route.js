import express from "express"
import {getClientes, addCliente, deleteCliente, updateCliente} from "../controllers/cliente.controller.js"
const router = express.Router()

router.get("/getClientes",getClientes);

router.post("/addCliente", addCliente);

router.delete("/deleteCliente/:uid",deleteCliente);

router.put("/updateCliente/:uid", updateCliente);

export default router
