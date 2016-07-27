StartupJS is "the boilerplate" to start developing a web applications without loose time doing
server and client configuration.

The server provides an ExpressJS app that comes allows REST webservices and websocket
communication. Has npm as package manager.

The client provides webpack to bundle resources and serve the static files, SASS to manage
stylesheets and npm as package manager.


FOLLOW THESE STEPS TO SETUP
---------------------------
---------------------------

1) run >git clone http://github.com/maxipaolucci/startupJS.git

2) Install node and npm in your pc (to check if you already have it installed do >npm --version  and  >node --version)


3) SERVER SETUP
---------------

3.1) Go to server directory and run >npm install

3.2) Start the server doing: >npm run start  (the server runs in port 3030)


4) CLIENT SETUP
---------------

4.1) Install webpack-dev-server npm package globally to have access to it in the command line:
>npm install -g webpack-dev-server

4.1) Go to client directory and run >npm install

4.3) Start the client webpack-server doing: >npm run start

4.4) Navigate to http://localhost:8080