import { Router } from 'express'
import authenticationMiddleware from '../middlewares/authentication.middleware.js';
import ConversationsController from '../controllers/conversations.controller.js';

const conversationsRoute = Router();

conversationsRoute.post("/new", authenticationMiddleware, ConversationsController.new);
conversationsRoute.get("/", authenticationMiddleware, ConversationsController.all);

export default conversationsRoute