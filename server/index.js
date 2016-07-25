import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import socketIO from 'socket.io';

let app = express();
let server = http.createServer(app);
let io = socketIO.listen(server);
let urlencode = bodyParser.urlencoded({extended: false});

//SERVER STARTER
let port = 3030;
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//WebSocket onConnection handler
io.on('connection', (socket) => {
  console.log('Client connected!');
  socket.emit('hello', 'this is the statupJS server!');
});