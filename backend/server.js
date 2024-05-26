import express from 'express';
import bodyParser from "body-parser";
import { BASE_PATH, PORT } from './config.js';
import mainRoute from './routes/index.js'
import sessionMiddleware from "./middlewares/session.middleware.js";
import cors from 'cors'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Socket from './controllers/socket.controller.js';

const app = express();

// setup CORS logic
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// session middleware logic
app.use(sessionMiddleware);

// websocket
Socket.init(sessionMiddleware)

app.use(BASE_PATH, mainRoute);
app.get('/', (_, res) => res.redirect(BASE_PATH))

app.get('*', function (req, res) {
  res.status(StatusCodes.NOT_FOUND).json({ success: false, message: ReasonPhrases.NOT_FOUND });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app