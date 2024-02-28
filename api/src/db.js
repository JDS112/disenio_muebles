import mongoose from "mongoose";

export const connect = async () =>{
    try{
        await mongoose.connect("mongodb+srv://John:admin117@final.i7hyzkr.mongodb.net/muebles")
        console.log("La conexion se realizo con exito")
    }catch(e){
        console.error(e)
    }
}