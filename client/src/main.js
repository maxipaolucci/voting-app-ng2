import './styles/main.scss'; //first the base stylesheet

import io from 'socket.io-client';
import {helloWorldStr} from 'components/helloWorld/helloWorld'; //import the component and its styles

const serverPort = 3030; //the server by default is configure to listen at this port
const socket = io(`${location.protocol}//${location.hostname}:${serverPort}`); //connect to the server

let serverDiv = document.createElement('div');

//print hello world component
let componentDiv = document.createElement('div');
componentDiv.innerHTML = helloWorldStr;
componentDiv.classList.add('hello-world-comp');
document.body.appendChild(componentDiv);

//print the server off div
serverDiv.innerHTML = 'Do not forget to start the server!';
serverDiv.classList.add('server-off');
document.body.appendChild(serverDiv);

socket.on('hello', msg => {
  //remove the server off div
  document.body.removeChild(serverDiv);
  //receive hello event from the server
  serverDiv = document.createElement('div');
  serverDiv.innerHTML = msg;
  serverDiv.classList.add('server-msg');
  document.body.appendChild(serverDiv);
});