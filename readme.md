#StartupJS

Another boilerplate to start developing web applications without loose time doing server and client configuration. Go directly to the core and avoid the boring stuff.

###The server is:
* an ExpressJS app
* enabled REST webservices and websocket communication.
* Mocha, chai and supertest for testing. (Supertest to test webservices).

###The client includes by default:
* Gulp for building tasks.
* Webpack to bundle resources and serve the webapp.
* SASS to manage stylesheets.
* Mocha and chai for test.


##Setup

1) run `>git clone http://github.com/maxipaolucci/startupJS.git`

2) Install node and npm in your pc (to check if you already have it installed do `>npm --version`  and  `>node --version`)


###Server Setup

3.1) Go to server directory and run `>npm install`

3.2) Start the server doing: `>npm run start`  (the server runs in port 3030)


###Client Setup

4.1) Install webpack-dev-server and gulp npm packages globally to have access to these
from the command line: `>npm install -g webpack-dev-server gulp`

4.1) Go to client directory and run `>npm install`

4.3) Start the development environment doing: `>gulp dev`
    This gulp task creates the build, starts watchers for html files (gulp task) and starts the webpack-dev-server
    The webpack-dev-servers also has watchers for js and css files with realtime refresh.

    If you are not doing development and just want to use the client webapp then run: `>gulp start`

4.4) Navigate to [http://localhost:8080]

5) (Optional - Just for testing). Run the tests scripts doing: `>gulp test`  OR  `>gulp test:watch`