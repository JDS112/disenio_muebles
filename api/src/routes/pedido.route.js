import express from "express"

import {getPedidos, addPedido, deletePedido, updatePedido} from "../controllers/pedido.controller.js"

const router = express.Router()

router.get('/getPedidos', getPedidos)

router.post("/addPedido", addPedido)

router.delete("/deletePedido/:nroPedido", deletePedido)

router.put("/updatePedido/:nroPedido", updatePedido)

export default router