import mongoose from "mongoose";

const notaSchema = mongoose.Schema({
    uidNota: {
        type: Number,
        unique: true,
    },
    idMueble: {
        type: mongoose.Types.ObjectId,
        require: true,
    },
    idCarpintero: {
        type: mongoose.Types.ObjectId,
        require: true,
    },
    fechaEntrega: {
        type: String,
        require: true,
    },
    idPedido: {
        type: mongoose.Types.ObjectId,
        require: true,
    }
})

notaSchema.statics.generateCustomId = async function () {
    const count = await this.countDocuments({});
    return count+1 ;
    };
const notaModel = mongoose.model("Nota", notaSchema)
export default notaModel