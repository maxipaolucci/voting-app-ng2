import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
//import reduxLogger from 'redux-logger';
import {NgRedux, select, DevToolsExtension} from 'ng2-redux';
import { Observable } from 'rxjs';


import rootReducer from '../model/store';
import {IVottingState} from '../model/reducers/vote';
import { IAppState } from '../model/store';
import { List } from 'immutable';

import '../../public/css/styles.css';
import { __DEVMODE__ } from "../constants/config";

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

  constructor(private ngRedux: NgRedux<IAppState>, private devTools: DevToolsExtension) {

    let enhancers : any[] = [];
    // ... add whatever other enhancers you want.

    // You probably only want to expose this tool in devMode.
    if (process.env.ENV === __DEVMODE__ && devTools.isEnabled()) {
      enhancers = [ ...enhancers, devTools.enhancer() ];
    }
    this.ngRedux.configureStore(rootReducer, {}, [], enhancers);
  }

  ngOnInit() {
    //this.socket = io(`${location.protocol}//${location.hostname}:3030`);
    //this.socket.on('state', (state:any) => console.log(state));
    this.vottingState.subscribe(state => {console.log(state.get('vote'))});
  }
}