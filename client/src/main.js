import './styles/main.scss'; //first the base stylesheet

import io from 'socket.io-client';
import {helloWordStr} from 'components/helloWorld/helloWorld'; //import the component and its styles

const serverPort = 3030; //the server by default is configure to listen at this port
const socket = io(`${location.protocol}//${location.hostname}:${serverPort}`); //connect to the server

let serverOffDiv = document.createElement('div');

//print hello world component
let elemDiv = document.createElement('div');
elemDiv.innerHTML = helloWordStr;
elemDiv.classList.add('hello-world-comp');
document.body.appendChild(elemDiv);

//print the server off div
serverOffDiv.innerHTML = 'Do not forget to start the server!';
serverOffDiv.classList.add('server-off');
document.body.appendChild(serverOffDiv);

socket.on('hello', msg => {
  //receive hello event from the server
  let serverDiv = document.createElement('div');
  serverDiv.innerHTML = msg;
  serverDiv.classList.add('server-msg');
  document.body.appendChild(serverDiv);
  //remove the server off div
  document.body.removeChild(serverOffDiv);
});