import express from "express"
import {addMueble, getMuebles, updateMueble, deleteMueble} from "../controllers/mueble.controller.js"

const router = express.Router()

router.post("/addMueble", addMueble)

router.get("/getMuebles", getMuebles)

router.put("/putMueble:uid", updateMueble)

router.delete("/deleteMueble/:uid", deleteMueble)


export default router