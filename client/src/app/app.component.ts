import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
//import reduxLogger from 'redux-logger';
import { NgRedux } from 'ng2-redux';

import {createStore} from 'redux';
import rootReducer from '../model/store';
import { IVoteState, INITIAL_STATE } from '../model/reducers/vote';

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

  constructor(private ngRedux: NgRedux<IVoteState>) {
    this.ngRedux.configureStore(rootReducer, INITIAL_STATE, []);
  }

  ngOnInit() {
    this.socket = io(`${location.protocol}//${location.hostname}:3030`);
    this.socket.on('state', (state:any) => console.log(state));
  }
}