import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as io from 'socket.io-client';
import {NgRedux, select, DevToolsExtension} from 'ng2-redux';
import { Observable } from 'rxjs';
import { List } from 'immutable';

import rootReducer from '../model/store';
import { IAppState, APP_INITIAL_STATE } from '../model/store';
import reduxLogger from '../model/configureLogger';

import { __DEVMODE__ } from "../constants/config";
import {VottingActions} from "./vottingActions.service";
import {VottingMiddleware} from "./vottingMiddleware.service";


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ VottingMiddleware ]
})
export class AppComponent implements OnInit {
  title : string = "Voting App";
  socket : any = null;
  @select( (state : IAppState) => state.vottingModel.getIn(['vote', 'pair'], List<string>()) ) votePair: Observable<List<string>>; //vote pair data
  //@select( (state : IAppState) => state.vottingModel.get('vote', List<string>()) ) vote: Observable<Map<string, any>>; //vote data

  constructor(
    private titleService : Title,
    private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private vottingActions: VottingActions,
    private vottingMiddleware: VottingMiddleware) {

    //set title
    this.titleService.setTitle(this.title);

    this.socket = io(`${location.protocol}//${location.hostname}:3030`);

    let enhancers : any[] = [];
    let middlewares : any[] = [ vottingMiddleware.manageRemote(this.socket) ];
    // ... add whatever other enhancers you want.

    if (__DEVMODE__) {
      // we probably only want to expose this tool in devMode.
      middlewares = [...middlewares, reduxLogger];
      if (devTools.isEnabled()) {
        enhancers = [ ...enhancers, devTools.enhancer() ];
      }
    }

    this.ngRedux.configureStore(rootReducer, APP_INITIAL_STATE, middlewares, enhancers);
  }

  ngOnInit() {
    this.socket.on('state', (state : any) => this.vottingActions.setState(state) ); //set a callback for 'state' events in socket
  }
}