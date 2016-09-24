import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import socketIO from 'socket.io';
import {validateUsername} from './controllers/users';

export function startServer(store) {
  let app = express();
  let server = http.createServer(app);
  let io = socketIO.listen(server);
  let urlencode = bodyParser.urlencoded({extended: false});

  //SERVER STARTER
  let port = 3030;
  server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });

  //we subscribe to any change in the store to emit the new state to all the clients connected.
  store.subscribe(
      () => io.emit('state', store.getState().toJS())
  );

  //WebSocket onConnection handler
  io.on('connection', (socket) => {
    console.log('Client connected!');
    socket.emit('state', store.getState().toJS()); //send current state to the client on connection
    socket.on('action', (data) => {
      //dispatch any received action event to the Redux store
      if (data.type == 'RESTART') {
        io.emit('clientRestart'); //we send this notification to all the clients to let them now that one of them restarted the app
                                  //we can do socket.broadband.emit('clientRestart') to notify all the clients except the sender(socket) but
                                  //to make a more homogeneous client reaction we prefer to notify all of them even the emitter
      }
      store.dispatch(data);
      //store.dispatch.bind(store)
    });
  });

  //MIDLEWARES
  app.use(bodyParser.json()); //parses de text comming as a json and exposes it on req.body (used with urlencode for POST request)
  app.use(express.static('public')); //serve any static content in the public directory.

  //SERVICES
  /**
   * Test with curl
   * GET: curl -X GET http://localhost:3030/
   * POST: curl -X POST -d testParam="test data" http://localhost:3030/testPost
   */


  /**
   * Login service. Expects a POST parameter called username as a String.
   */

  app.get('/login', validateUsername, (req, res) => {
    let logLine = `[${Date.now()}] JSONP /login `;

    //let password = req.body.password;
    let data = {status: "success", codeno: 200, msg: `OK`};
    logLine += `${data.status}: ${data.msg}`;
    console.log(logLine);
    res.jsonp(data);
  });

  /**
   * Logout user
   */
  // app.get('/logout/:username', authMiddleware, (req, res) => {
  //   let username = req.params.username;
  //   clearLoginData(username);
  //   res.json({ status : "success", codeno : 200, msg : ""});
  // });
}
