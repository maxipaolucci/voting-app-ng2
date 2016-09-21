import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import socketIO from 'socket.io';

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


  store.subscribe(
      () => io.emit('state', store.getState().toJS())
  );

  //WebSocket onConnection handler
  io.on('connection', (socket) => {
    console.log('Client connected!');
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });

  //MIDLEWARES
  app.use(bodyParser.json()); //parses de text comming as a json and exposes it on req.body (used with urlencode for POST request)
  app.use(express.static('public')); //serve any static content in the public directory.

  //LOGIC
  const validateUser = (username, callback) => {
    const mockedUsers = require('../users.json');

    if (mockedUsers.filter(value => value === username).length) {
      return callback(true);
    }

    return callback(false);
  };

  //SERVICES
  /**
   * Test with curl
   * GET: curl -X GET http://localhost:3030/
   * POST: curl -X POST -d testParam="test data" http://localhost:3030/testPost
   */


  /**
   * Login service. Expects a POST parameter called username as a String.
   */
  //app.set("jsonp callback", true);

  app.get('/login', (req, res) => {
    let data = {};
    let logLine = `[${Date.now()}] JSONP /login `;
    const username = req.query.username;
    logLine += `username=${username} `;

    //let password = req.body.password;

    if (username /*&& password*/) {
      validateUser(username, (result) => {
        if (result) {
          data = { status : "success", codeno : 200, msg : "OK" };
          res.header('Content-type','application/javascript');
          res.header('Charset','utf8');
          logLine += data.status;
          console.log(logLine);
          res.jsonp(data);
        } else {
          data = {status: "error", codeno: 400, msg: `login: Failed to login with username: ${username}`};
          logLine += `${data.status}: ${data.msg}`;
          console.log(logLine);
          res.jsonp(data);
        }
      });
    } else {
      let data = {status: "error", codeno: 400, msg: "login: Username and/or password could not be empty"};
      logLine += `${data.status}: ${data.msg}`;
      console.log(logLine);
      res.jsonp(data);
    }
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
