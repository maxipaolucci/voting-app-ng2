import './styles/main.scss'; //first the base stylesheet

import io from 'socket.io-client';
import {tabTitle} from 'components/tab/tab'; //import the component and its styles

const serverPort = 3030; //the server by default is configure to listen at this port
const socket = io(`${location.protocol}//${location.hostname}:${serverPort}`); //connect to the server

socket.on('hello', msg => console.log(msg)); //receive hello event from the server

console.log(tabTitle);