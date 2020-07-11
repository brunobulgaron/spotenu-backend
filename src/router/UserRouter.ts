import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

// SignUp user_free (normal)
userRouter.post("/signup", new UserController().signup);

// SignUp de banda
userRouter.post("/signupBand", new UserController().signupBand);

// Login
userRouter.post("/login", new UserController().login);