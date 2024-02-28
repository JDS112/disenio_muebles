import muebleModel from "../models/mueble.js"

export const addMueble = async(req, res) => {
    try {
        const {descripcion, tamañoSugerido, labrado, precio} = req.body
        const newMueble = new muebleModel({
            uid: await muebleModel.generateCustomId(),
            descripcion: descripcion,
            tamañoSugerido: tamañoSugerido,
            labrado: labrado,
            precio: precio,
        })

        const muebleSaved = await newMueble.save()
        res.json(muebleSaved)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getMuebles = async(req, res) =>{
    try {
        const muebles = await muebleModel.find()
        res.json(muebles)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const deleteMueble = async (req, res) => {
    try {
        const uid = req.params.uid;
        const mueble = await muebleModel.findOneAndDelete({uid: uid});
        if(!mueble){
            return res.status(404).json({error: "Mueble no encontrado"})
        }

        res.json({message: "Mueble eliminado correctamente"})
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el mueble" });
    }
}

export const updateMueble = async (req, res) => {
    const uid = req.params.uid;
    const { descripcion, tamañoSugerido, labrado, precio } = req.body;

    try {
        const muebleFound = await muebleModel.findOne({ uid: uid });
  
        if (!muebleFound) {
            return res.status(404).json({ error: "Mueble no encontrado" });
        }
      
        muebleFound.descripcion = descripcion || muebleFound.username
        muebleFound.tamañoSugerido= tamañoSugerido || muebleFound.email
        muebleFound.labrado = labrado || muebleFound.labrado
        muebleFound.precio = precio || muebleFound.precio
        const updatedMueble = await muebleFound.save();
  
        res.json(updateMueble);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el mueble" });
    }
}