const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const robot = require('robotjs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('📱 Cihaz bağlandı:', socket.id);

  // Yazı gönderme
  socket.on('type', (text) => {
    setTimeout(() => {
      robot.typeString(text);
      robot.keyTap('enter');
    }, 100);
  });

  // Kısayol tuşları
  socket.on('key', (key) => {
    console.log('Tuş:', key);
    try {
      // Medya tuşları
      if (key === 'volume_up') robot.keyTap('audio_vol_up');
      else if (key === 'volume_down') robot.keyTap('audio_vol_down');
      else if (key === 'volume_mute') robot.keyTap('audio_mute');
      else if (key === 'media_play_pause') robot.keyTap('audio_play');
      else if (key === 'media_next') robot.keyTap('audio_next');
      else if (key === 'media_prev') robot.keyTap('audio_prev');
      // Tarayıcı kısayolları
      else if (key === 'ctrl+t') {
        robot.keyToggle('control', 'down');
        robot.keyTap('t');
        robot.keyToggle('control', 'up');
      }
      else if (key === 'ctrl+w') {
        robot.keyToggle('control', 'down');
        robot.keyTap('w');
        robot.keyToggle('control', 'up');
      }
      else if (key === 'alt+left') {
        robot.keyToggle('alt', 'down');
        robot.keyTap('left');
        robot.keyToggle('alt', 'up');
      }
      else if (key === 'alt+right') {
        robot.keyToggle('alt', 'down');
        robot.keyTap('right');
        robot.keyToggle('alt', 'up');
      }
      // Diğer tuşlar
      else if (key === 'escape') robot.keyTap('escape');
      else if (key === 'space') robot.keyTap('space');
      else if (key === 'enter') robot.keyTap('enter');
      else if (key === 'backspace') robot.keyTap('backspace');
      else if (key === 'tab') robot.keyTap('tab');
      else robot.keyTap(key);
    } catch (err) {
      console.error('Tuş hatası:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔌 Ayrıldı:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('✅ Sunucu çalışıyor: http://localhost:3000');
});