//USERS CONTROLLER

/**
 * validateUsername middleware
 * @param req
 * @param res
 * @param next
 */
export const validateUsername = (req, res, next) => {
  const mockedUsers = require('../../users.json');
  const username = req.query.username;
  let logLine = `[${Date.now()}] JSONP /login (validateUsername with username=${username}) `;

  if (username) {
    if (mockedUsers.filter(value => value === username).length) {
      //valid username
      next();
    } else {
      let data = {status: "error", codeno: 400, msg: `login: Failed to login with username: ${username}`};
      logLine += `${data.status}: ${data.msg}`;
      console.log(logLine);
      res.jsonp(data);
    }
  } else {
    let data = {status: "error", codeno: 400, msg: "login: Username and/or password could not be empty"};
    logLine += `${data.status}: ${data.msg}`;
    console.log(logLine);
    res.jsonp(data);
  }
};