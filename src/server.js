const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

// WebSocket logic
io.on('connection', (socket) => {
  console.log('New WebSocket connection');
  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
