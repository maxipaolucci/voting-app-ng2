import express from 'express';
import {validateUsername} from '../controllers/users';

let usersRouter = express.Router();

/**
 * Login service. Expects a POST parameter called username as a String.
 */

usersRouter.route('/login')
  .get(validateUsername, (req, res) => {
    let logLine = `[${Date.now()}] JSONP /login `;

    //let password = req.body.password;
    let data = {status: "success", codeno: 200, msg: `OK`};
    logLine += `${data.status}: ${data.msg}`;
    console.log(logLine);
    res.jsonp(data);
  });

export default usersRouter;