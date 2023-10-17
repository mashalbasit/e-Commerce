import express from "express"
import {registerUser, userLogin, getAllUser, getSingleUser, updateSingleUser, deleteSingleUser, updatePassword} from "../Controller/userController.js"

const router = express.Router()

router.post("/user/register", registerUser)
router.post("/user/login", userLogin)
router.get("/user", getAllUser)
router.get("/user/:id", getSingleUser)
router.put("/user/:id", updateSingleUser)
router.delete("/user/:id", deleteSingleUser)
router.post("/user/update-password", updatePassword)

export {router}