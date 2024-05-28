import { Router } from 'express'
import SearchController from "../controllers/search.controller.js";
import authenticationMiddleware from '../middlewares/authentication.middleware.js';

const searchRoute = Router();

searchRoute.get("/", authenticationMiddleware, SearchController.search);

export default searchRoute