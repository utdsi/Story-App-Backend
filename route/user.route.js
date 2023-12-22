

const express = require("express")

const userRouter = express.Router()

const { signup, login, remove, update_password, forgot_password, user_profile_edit, user_profile_pic_edit } = require("../controller/user.controller")
const { authentication } = require("../middleware/auth")


userRouter.post("/register", signup)

userRouter.post("/login", login)

userRouter.delete("/remove", authentication, remove)

userRouter.patch("/update_password", authentication, update_password)

userRouter.post("/forgot_password", authentication, forgot_password)

userRouter.patch("/user_profile_edit", authentication, user_profile_edit)

userRouter.patch("/user_profile_pic_edit", authentication, user_profile_pic_edit)


module.exports = { userRouter }