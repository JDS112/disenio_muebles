import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    uid: {
        type: Number,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: false
    },
    estado: {
        type: String,
        require: true,
    }
})
userSchema.statics.generateCustomId = async function () {
    const lastUser = await this.findOne({}, {}, { sort: { 'uid': -1 } });
    const count = lastUser ? lastUser.uid : 0;
    return count+1 ;
  };
const userModel = mongoose.model("User", userSchema);
export default userModel