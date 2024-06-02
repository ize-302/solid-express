import { Router } from 'express'

import authRoute from "./auth.route.js";
import profileRoute from "./profile.route.js";
import searchRoute from "./search.route.js";
import conversationsRoute from "./conversations.route.js";
import messagesRoute from "./messages.route.js";

const mainRoute = Router();

mainRoute.get("/", (req, res) =>
  res.status(200).send('Hello from the backend!')
);

mainRoute.use("/", authRoute);
mainRoute.use("/profile", profileRoute);
mainRoute.use("/messages", messagesRoute);
mainRoute.use("/search", searchRoute);
mainRoute.use("/conversations", conversationsRoute);

export default mainRoute