import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import {createStore} from 'redux';
import reducer from './reducer';

import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = "Maxi";
  socket : any = null;
  store : any = null;

  ngOnInit() {
    this.store = createStore(reducer);
    this.store.dispatch({
      type: 'SET_STATE',
      state: {}
    });
    this.socket = io(`${location.protocol}//${location.hostname}:3030`);
    this.socket.on('state', (state:any) => console.log(state));
  }
}