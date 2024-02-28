import pedidoModel from "../models/pedido.js"

export const addPedido = async(req, res) => {
    try {
        const{idCliente, idMueble, cantidad, fechaPedido, fechaEntrega, seña, estado, labrado} = req.body
        
        const newPedido = new pedidoModel({
            nroPedido: await pedidoModel.generateNroPedido(),
            idCliente: idCliente,
            idMueble: idMueble,
            cantidad: cantidad,
            fechaPedido: fechaPedido,
            fechaEntrega: fechaEntrega,
            seña: seña,
            estado: estado,
            labrado: labrado,
        })

        const pedidoSaved = await newPedido.save()
        res.json(pedidoSaved)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const getPedidos = async (req, res) => {
    try {
        const pedidos = await pedidoModel.find()
        res.json(pedidos)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const deletePedido = async(req, res) => {
    const nroPedido = req.params.nroPedido
    try {
        const pedido = await pedidoModel.findOneAndDelete({nroPedido: nroPedido})
        if(!pedido){
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.json({ message: "Pedido eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el pedido" });
    }
}
export const updatePedido = async(req, res) => {
    const nroPedido = req.params.nroPedido;
    const{idCliente, idMueble, cantidad, fechaPedido, fechaEntrega, seña, estado, carpintero , labrado} = req.body
    try {
        const pedidoFound = await pedidoModel.findOne({nroPedido:nroPedido});
        if(!pedidoFound) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        pedidoFound.idCliente = idCliente || pedidoFound.idCliente
        pedidoFound.idMueble = idMueble || pedidoFound.idMueble
        pedidoFound.cantidad = cantidad || pedidoFound.cantidad
        pedidoFound.fechaPedido = fechaPedido || pedidoFound.fechaPedido
        pedidoFound.fechaEntrega = fechaEntrega || pedidoFound.fechaEntrega
        pedidoFound.seña = seña || pedidoFound.seña
        pedidoFound.estado = estado || pedidoFound.estado
        pedidoFound.carpintero = carpintero || pedidoFound.carpintero
        pedidoFound.labrado = labrado || pedidoFound.labrado

        const updatedPedido = await pedidoFound.save()

        res.json(updatedPedido)
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el pedido" });
    } 
}