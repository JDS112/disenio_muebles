import clienteModel from "../models/cliente.js"

export const addCliente = async (req, res) => {
    try {
        const {nombre, domicilio, telefono, tarjetaCredito, nroTarjeta, nroCuentaBancario, codigoBancario} = req.body
        const newCliente = new clienteModel({
            uid: await clienteModel.generateCustomId(),
            nombre: nombre,
            domicilio: domicilio,
            telefono: telefono,
            tarjetaCredito: tarjetaCredito,
            nroTarjeta: nroTarjeta,
            nroCuentaBancario: nroCuentaBancario,
            codigoBancario: codigoBancario,
        })

        const clienteSaved = await newCliente.save()

        res.json(clienteSaved)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const getClientes = async (req, res) => {
    try {
        const clientes = await clienteModel.find();
        res.json(clientes)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const deleteCliente = async (req, res) => {
    try {
        const uid = req.params.uid;
        const cliente = await clienteModel.findOneAndDelete({uid: uid});
        if(!cliente){
            return res.status(404).json({error: "Cliente no encontrado"})
        }

        res.json({message: "Cliente eliminado correctamente"})
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el cliente" });
    }
}

export const updateCliente = async (req, res) => {
    const uid = req.params.uid;
    const {nombre, domicilio, telefono, tarjetaCredito, nroTarjeta, nroCuentaBancario, codigoBancario} = req.body;

    try {
        const clienteFound = await clienteModel.findOne({ uid: uid });
  
        if (!clienteFound) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }
      
        clienteFound.nombre = nombre || clienteFound.nombre
        clienteFound.domicilio = domicilio || clienteFound.domicilio
        clienteFound.telefono = telefono || clienteFound.telefono
        clienteFound.tarjetaCredito = tarjetaCredito || clienteFound.tarjetaCredito
        clienteFound.nroTarjeta = nroTarjeta || clienteFound.nroTarjeta
        clienteFound.nroCuentaBancario = nroCuentaBancario || clienteFound.nroCuentaBancario
        clienteFound.codigoBancario = codigoBancario || clienteFound.codigoBancario
        const updatedCliente = await clienteFound.save();
  
        res.json(updatedCliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el cliente" });
    }
}