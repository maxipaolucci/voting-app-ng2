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
  socket.emit('hello', 'StartupJS server is running!');
});

//MIDLEWARES
app.use(bodyParser.json()); //parses de text comming as a json and exposes it on req.body (used with urlencode for POST request)
app.use(express.static('public')); //serve any static content in the public directory.

//SERVICES
/**
 * Sample GET service
 * Test it doing: curl -X GET http://localhost:3030/
 */
app.get('/', (req, res) => {
  console.log(`A client access "/"`);
  res.sendStatus(200);
});

/**
 * Sample POST service.
 * Test it doing: curl -X POST -d testParam="test data" http://localhost:3030/testPost
 */
app.post('/testPost', urlencode, (req, res) => {
  let testParam = req.body.testParam;
  console.log(`A client access "/testPost" with param: testParam = ${testParam}`);
  res.json({ status: 'success', msg: `we successfully received your payload: ${testParam}` });
});