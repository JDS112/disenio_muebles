import express from "express"
import { register, login, getAllUsers, updateUser, deleteUser} from "../controllers/user.controller.js"
const router = express.Router()

//create new user
router.post("/register", register)

router.post("/login", login)

router.get("/users", getAllUsers);

router.put("/users/:uid", updateUser);

router.delete("/users/:uid", deleteUser);

export default router;