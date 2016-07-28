StartupJS is "the boilerplate" to start developing a web applications without loose time doing
server and client configuration.

The server is an ExpressJS app that allows REST webservices and websocket communication.

The client icludes by default:
* Gulp for building tasks.
* Webpack to bundle resources and serve the webapp.
* SASS to manage stylesheets.


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

4.1) Install webpack-dev-server and gulp npm packages globally to have access to these
from the command line: >npm install -g webpack-dev-server gulp

4.1) Go to client directory and run >npm install

4.3) Start the client webpack-server doing: >npm run start

4.4) Navigate to http://localhost:8080