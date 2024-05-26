import { Router } from 'express'
import pjson from '../../package.json' assert { type: 'json' };

import authRoute from "./auth.route.js";
import profileRoute from "./profile.route.js";

const mainRoute = Router();

mainRoute.get("/", (req, res) =>
  res.status(200).send('Hello from the backend!')
);

mainRoute.use("/", authRoute);
mainRoute.use("/profile", profileRoute);

export default mainRoute