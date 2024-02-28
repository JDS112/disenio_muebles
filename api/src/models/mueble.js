import mongoose from "mongoose"

const muebleSchema = mongoose.Schema({
    uid: {
        type: Number,
        unique: true,
    },
    descripcion: {
        type: String, 
        require: true,
    },
    tamañoSugerido: {
        type: String,
        require: true,
    },
    labrado: {
        type: String,
        require: true,
    },
    precio: {
        type: String,
        require: true,
    },
})
muebleSchema.statics.generateCustomId = async function () {
    const lastUser = await this.findOne({}, {}, { sort: { 'uid': -1 } });
    const count = lastUser ? lastUser.uid : 0;
    return count+1 ;
  };
const muebleModel = mongoose.model("Mueble", muebleSchema)
export default muebleModel