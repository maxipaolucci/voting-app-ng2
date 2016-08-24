import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
//import reduxLogger from 'redux-logger';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs';

import {createStore} from 'redux';
import rootReducer from '../model/store';
import {INITIAL_STATE, IVottingState} from '../model/reducers/vote';
import { IAppState } from '../model/store';
import { List } from 'immutable';

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
  @select((state : IAppState) => state.vottingModel) vottingState: Observable<IVottingState>;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.ngRedux.configureStore(rootReducer, {}, []);
  }

  ngOnInit() {
    //this.socket = io(`${location.protocol}//${location.hostname}:3030`);
    //this.socket.on('state', (state:any) => console.log(state));
    this.vottingState.subscribe(state => {console.log(state.get('vote'))});
  }
}