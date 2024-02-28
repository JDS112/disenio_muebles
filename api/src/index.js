import express from "express"
import cors from "cors"
import {connect} from "./db.js"
import userRoutes from "./routes/user.route.js"
import muebleRoutes from "./routes/mueble.route.js"
import clienteRoutes from "./routes/cliente.route.js"
import pedidoRoutes from "./routes/pedido.route.js"
const app = express()
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
connect()
const port = 3000
app.use(express.json())
app.use("/api", userRoutes)
app.use("/api", muebleRoutes)
app.use("/api", clienteRoutes)
app.use("/api", pedidoRoutes)


app.listen(port, () => console.log("Servidor escuchando en el puerto "+port))