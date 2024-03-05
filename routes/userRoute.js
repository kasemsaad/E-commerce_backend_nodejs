import express from "express";
import {signup,signin,forgetPassword,addNewpassword}  from "../controllers/userController.js";
import { signupSchema,signinSchema } from "../controllers/userValidation.js";
import {validation,checktoken} from "../middleware/validation.js";
const userRouter=express.Router();

userRouter.post("/signup",validation(signupSchema),signup)
userRouter.post("/signin",validation(signinSchema),signin)
userRouter.post("/forgetPassword",forgetPassword)
userRouter.put ("/resetpassword/:token",addNewpassword)
// userRouter.get("/user",userdata)
// userRouter.get("/user/verify/:token",veraccount)


export default userRouter