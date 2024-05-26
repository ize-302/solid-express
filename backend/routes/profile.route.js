import { Router } from 'express'
import ProfileController from "../controllers/profile.controller.js";
import authenticationMiddleware from '../middlewares/authentication.middleware.js';

const profileRoute = Router();

profileRoute.get("/me", authenticationMiddleware, ProfileController.get);

export default profileRoute