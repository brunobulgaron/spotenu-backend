import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

// SignUp user_free (normal)
userRouter.post("/signup", new UserController().signup);

// SignUp de Banda
userRouter.post("/signupBand", new UserController().signupBand);

// SignUp de Admin
userRouter.post("/signupAdmin", new UserController().signupAdmin);

// Login
userRouter.post("/login", new UserController().login);