import express from "express";
import { loginUser, resgisterUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", resgisterUser);

authRouter.post("/login", loginUser);

export default authRouter;
