import express from 'express';
// import http from 'http';
import bodyParser from "body-parser";
import { WebSocketServer } from 'ws';
import { BASE_PATH, PORT } from './config.js';
import mainRoute from './routes/index.js'
import sessionMiddleware from "./middlewares/session.middleware.js";
import cors from 'cors'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const app = express();

// setup CORS logic
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// session middleware logic
app.use(sessionMiddleware);

// const server = http.createServer(app);
const wss = new WebSocketServer({ port: 433 });

const clients = new Map();

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message)
      const { type, content, channel } = parsedMessage

      if (type === 'subscribe') {
        // Subscribe to a channel
        if (!clients.has(ws)) {
          clients.set(ws, new Set());
        }
        clients.get(ws).add(channel);
      } else if (type === 'message') {
        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
          if (client.readyState && clients.get(client)?.has(channel)) {
            client.send(JSON.stringify({ channel, content }));
          }
        });
      }
    } catch (error) {
      console.error('Error processing message', err);
    }

  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.use(BASE_PATH, mainRoute);
app.get('/', (_, res) => res.redirect(BASE_PATH))

app.get('*', function (req, res) {
  res.status(StatusCodes.NOT_FOUND).json({ success: false, message: ReasonPhrases.NOT_FOUND });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app