import { WebSocketServer } from 'ws';
import { fetchUserDetailByUsername } from './helpers.js';

class Socket {
  static async init(sessionMiddleware) {
    const wss = new WebSocketServer({ port: 433 });
    const clients = new Map();

    wss.on('connection', (ws, req) => {
      sessionMiddleware(req, {}, async function () {
        const { user: user_session_data } = req.session
        console.log(`New websocket connection: ${user_session_data.username}`);

        // get user detail
        const userDetail = await fetchUserDetailByUsername(req, undefined, user_session_data.username)
        ws.on('message', (message) => {
          try {
            const parsedMessage = JSON.parse(message)
            const { type, content, channel, author } = parsedMessage

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
                  client.send(JSON.stringify({ channel, content, author: userDetail }));
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
    });

  }
}

export default Socket