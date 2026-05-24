const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const ks = require('node-key-sender');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Cihaz bağlandı:', socket.id);

  socket.on('type', (text) => {
    ks.sendText(text);
    ks.sendKey('enter');
  });

  socket.on('command', (cmd) => {
    if (cmd === 'closeTab') {
      ks.sendCombination(['control', 'w']);
    }
  });
});

server.listen(3000, () => {
  console.log('Sunucu çalışıyor: http://localhost:3000');
});