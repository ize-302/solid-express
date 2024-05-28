import express from 'express';
import bodyParser from "body-parser";
import { BASE_PATH, PORT } from './config.js';
import mainRoute from './routes/index.js'
import sessionMiddleware from "./middlewares/session.middleware.js";
import cors from 'cors'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Socket from './controllers/socket.controller.js';
import { createServer } from 'http'

const app = express();

// session middleware logic
app.use(sessionMiddleware);

// setup CORS logic
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(BASE_PATH, mainRoute);
app.get('/', (_, res) => res.redirect(BASE_PATH))

app.get('*', function (req, res) {
  res.status(StatusCodes.NOT_FOUND).json({ success: false, message: ReasonPhrases.NOT_FOUND });
});

const server = createServer(app)

// websocket
Socket.init(sessionMiddleware, server)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// export default app