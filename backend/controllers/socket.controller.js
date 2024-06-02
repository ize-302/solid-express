import { WebSocketServer } from 'ws';
import { fetchUserDetailByUsername } from './helpers.js';


class Socket {
  static async init(sessionMiddleware, server) {
    const wss = new WebSocketServer({ server });
    const clients = new Map();

    wss.on('connection', (ws, req) => {
      sessionMiddleware(req, {}, async function (err) {
        if (err) {
          console.error('Session middleware error:', err);
          ws.close();
          return;
        }

        const { user: user_session_data } = req.session // current user

        if (user_session_data) {
          console.log('A new client connected:')
          ws.on('message', function message(data) {
            const parsedData = JSON.parse(data)
            const { type, content, channel, sender_id } = parsedData

            if (type === 'subscribe') {
              // Subscribe to a channel
              if (!clients.has(ws)) {
                clients.set(ws, { channels: new Set(), sender_id });
              }
              clients.get(ws).channels.add(channel);
              console.log(sender_id, 'subscribed to: ', channel)
            }
            else if (type === 'message') {
              // Broadcast the message to all clients
              wss.clients.forEach((client) => {
                const clientData = clients.get(client);
                if (client.readyState === ws.OPEN && clientData && clientData.channels.has(channel)) {
                  client.send(JSON.stringify({ channel, content, sender_id }));
                }
              });
            }
          });

          ws.on('close', () => {
            console.log('disconnected', new Date().toISOString());
          });
        } else {
          console.log('Unauthorised')
        }


      })

    })

    console.log('WebSocket server started on port 5000', new Date().toISOString());
  }
}

// class Socket {
//   static async init(sessionMiddleware) {
//     const wss = new WebSocketServer({ port: 8080 });
//     const clients = new Map();

//     wss.on('connection', (ws, req) => {
//       sessionMiddleware(req, {}, async function (err) {
//         if (err) {
//           console.error('Session middleware error:', err);
//           ws.close();
//           return;
//         }

//         const { user: user_session_data } = req.session
//         if (user_session_data) {
//           console.log(`New websocket connection: ${user_session_data?.username}`);

//           try {
//             // get user detail
//             const userDetail = await fetchUserDetailByUsername(req, undefined, user_session_data.username)
//             ws.on('message', (message) => {
//               try {
//                 const parsedMessage = JSON.parse(message)
//                 const { type, content, channel } = parsedMessage

//                 if (type === 'subscribe') {
//                   // Subscribe to a channel
//                   if (!clients.has(ws)) {
//                     // clients.set(ws, new Set());
//                     clients.set(ws, { channels: new Set(), userDetail });
//                   }
//                   // clients.get(ws).add(channel);
//                   clients.get(ws).channels.add(channel);
//                 } else if (type === 'message') {
//                   // Broadcast the message to all clients
//                   wss.clients.forEach((client) => {
//                     const clientData = clients.get(client);
//                     console.log('hmm--', clientData)
//                     // if (client.readyState === ws.OPEN && clients.get(client)?.has(channel)) {
//                     // if (client.readyState === ws.OPEN && clientData && clientData.channels.has(channel)) {
//                     //   client.send(JSON.stringify({ channel, content, author: userDetail }));
//                     // }
//                   });
//                 }
//               } catch (error) {
//                 console.error('Error processing message', err);
//               }
//             });
//           } catch (error) {
//             console.error('Error fetching user details:', error);
//           }
//         }

//         ws.on('close', () => {
//           console.log('Client disconnected');
//           clients.delete(ws);
//         });
//       });
//     });

//   }
// }

export default Socket