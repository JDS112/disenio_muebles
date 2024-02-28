import userModel from "../models/user.js"
import bcrypt from "bcrypt"

export const login = async (req, res) => {
    const {email, password} = req.body
    try{
        const userFound = await userModel.findOne({email})

        if(!userFound) {
            return res.status(401).json({error: "Usuario no encontrado"})
        }

        const isPasswordValid = await bcrypt.compare(password, userFound.password)
        if(!isPasswordValid) {
            return res.status(401).json({error: "Contraseña invalida"})
        }

        res.json(userFound)
    }catch(error){
        console.error(error)
        res.status(500).json({error: "Error al iniciar sesion"})
    }
}
export const register = async(req, res) => {
    try {
        const {username,email, password,rol, estado} = req.body;
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new userModel({
            uid: await userModel.generateCustomId(),    
            username: username,
            email: email,
            password: hashedPassword,
            rol: rol,
            estado: estado,
        })
        const userSaved = await newUser.save()

        res.json(userSaved)
    } catch (error) {
        res.json({ message: error})
    }
}
export const getAllUsers = async(req, res) => {
    try {
        const users = await userModel.find()
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const deleteUser = async (req, res) => {
    const uid = req.params.uid;

    try {
        const user = await userModel.findOneAndDelete({ uid: uid });  
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};

export const updateUser = async (req, res) => {
    const uid = req.params.uid;
    const { username, email, password, rol, estado } = req.body;
  
    try {
        const user = await userModel.findOne({ uid: uid });
  
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
      
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password ? await bcrypt.hash(password, 10) : user.password;
        user.rol = rol || user.rol;
        user.estado = estado || user.estado;
  
        const updatedUser = await user.save();
  
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};
