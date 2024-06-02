import { Router } from 'express'
import MessagesController from "../controllers/messages.controller.js";
import authenticationMiddleware from '../middlewares/authentication.middleware.js';

const messagesRoute = Router();

messagesRoute.post("/", authenticationMiddleware, MessagesController.saveMessage);
messagesRoute.get("/:conversation_id", authenticationMiddleware, MessagesController.getMessages);

export default messagesRoute