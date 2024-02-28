import mongoose from "mongoose"

const pedidoSchema = mongoose.Schema({
    nroPedido: {
        type: Number,
        unique: true,
    },
    idCliente: {
        type: String,
        require: true,
    },
    idMueble: {
        type: String,
        require: true,
    },
    cantidad: {
        type: String,
        require: true,
    },
    fechaPedido: {
        type: String,
        require: true,
    },
    fechaEntrega: {
        type: String,
        require: true,
    },
    seña: {
        type: String,
        require: true,
    },
    estado: {
        type: String,
        require: true,
    },
    carpintero: {
        type: String,
        require: false,
    },
    labrado: {
        type: String,
        require: true,
    }

})

pedidoSchema.statics.generateNroPedido = async function () {
    const lastPedido = await this.findOne({}, {}, { sort: { 'nroPedido': -1 } });
    const count = lastPedido ? lastPedido.nroPedido : 0;
    return count+1 ;
  };
const pedidoModel = mongoose.model('Pedido', pedidoSchema)
export default pedidoModel