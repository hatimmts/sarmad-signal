const WebSocket = require('ws');

const port = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port });

let peers = new Set();

wss.on('connection', function connection(ws) {
  peers.add(ws);

  ws.on('message', function incoming(message) {
    // Broadcast signaling messages to all peers
    peers.forEach(peer => {
      if (peer !== ws && peer.readyState === WebSocket.OPEN) {
        peer.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    peers.delete(ws);
  });
});

console.log("Sarmad Signaling Server running on port " + port);
