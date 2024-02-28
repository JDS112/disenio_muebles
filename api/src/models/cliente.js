import mongoose from "mongoose";

const clienteSchema = mongoose.Schema({
    uid: {
        type: Number,
        unique: true,
    },
    nombre: {
        type: String,
        require: true,
    },
    domicilio: {
        type: String,
        require: true,
    },
    telefono: {
        type: String,
        require: true,
    },
    tarjetaCredito: {
        type: String,
        require: true,
    },
    nroTarjeta: {
        type: String,
        require: true,
    },
    nroCuentaBancario: {
        type: String,
        require: true,
    },
    codigoBancario: {
        type: String,
        require: true,
    }
})

clienteSchema.statics.generateCustomId = async function () {
    const lastUser = await this.findOne({}, {}, { sort: { 'uid': -1 } });
    const count = lastUser ? lastUser.uid : 0;
    return count+1 ;
  };
const clienteMoldel = mongoose.model('Cliente', clienteSchema)
export default clienteMoldel