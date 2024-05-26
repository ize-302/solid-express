import { Router } from 'express'
import AuthController from "../controllers/auth.controller.js";

const authRoute = Router();

authRoute.post("/register", AuthController.register);
authRoute.post("/login", AuthController.login);
authRoute.post("/logout", AuthController.logout);

export default authRoute