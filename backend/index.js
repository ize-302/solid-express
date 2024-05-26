import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ port: 433 });

const PORT = process.env.PORT || 5000;

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


app.get('/api', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});