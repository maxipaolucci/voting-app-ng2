import express from 'express';
import {validateUsername} from '../controllers/users';

let usersRouter = express.Router();


usersRouter.route('/login')
  .get(validateUsername, (req, res) => {
    let logLine = `[${Date.now()}] JSONP /login `;

    //let password = req.body.password;
    let data = {status: "success", codeno: 200, msg: `OK`};
    logLine += `${data.status}: ${data.msg}`;
    console.log(logLine);
    res.jsonp(data);
  });
// .get('/logout/:username', (req, res) => {
//   let username = req.params.username;
//   clearLoginData(username);
//   res.json({ status : "success", codeno : 200, msg : ""});
// });

export default usersRouter;