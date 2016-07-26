FOLLOW THESE STEPS TO INSTALL
-----------------------------

1) run >git clone http://github.com/maxipaolucci/startupJS.git

2) Install node and npm in your pc (to check if you already have it installed do >npm --version  and  >node --version)


3) SERVER SETUP

3.1) Go to server directory and run >npm install

3.2) Start the server doing: >npm run start


4) CLIENT SETUP

4.1) Install webpack-dev-server npm package globally to have access to it in the command line doing:
>npm install -g webpack-dev-server

4.1) Go to client directory and run >npm install








4.1) If you already have gulp installed then goto step (4.2) If gulp has not been installed before in this computer
    (you can check it doing >gulp --version) run >npm install gulp -g     (to install it globally and allow gulp commands in the console).

4.2) run >gulp build     (to translate es2015 to common js and compile sass)

5) run >node app         (to start the local server)

6) navigate to this url to access the app: http://localhost:3000  and login using a valid jira user




FOLLOW THESE STEPS TO UPDATE
----------------------------

1) run >git pull       (to update the source code from GIT)

2) run >npm install    (to install new packages if someone new was added)

3) run >guip build     (to regenerate sass and translate es2015 into common js)

4) run >node app       (to start the server on port 3000)

5) navigate to this url to access the app: http://localhost:3000  and login using a valid jira user

