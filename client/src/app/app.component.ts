import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {NgRedux, DevToolsExtension} from 'ng2-redux';
import { NgReduxRouter } from 'ng2-redux-router';

import rootReducer from '../model/store';
import { IAppState, APP_INITIAL_STATE } from '../model/store';
import reduxLogger from '../model/configureLogger';

import { __DEVMODE__ } from "../constants/config";
import {VottingActionsService} from "./modules/voting/services/vottingActions.service.ts";
import {VottingMiddlewareService} from "./modules/voting/services/vottingMiddleware.service.ts";


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ VottingMiddlewareService ]
})
export class AppComponent implements OnInit {
  socket : any = null;
  
  constructor(
      private ngRedux: NgRedux<IAppState>,
      private ngReduxRouter: NgReduxRouter,
      private devTools: DevToolsExtension,
      private vottingActionsService: VottingActionsService,
      private vottingMiddlewareService: VottingMiddlewareService) {
    
    this.socket = io(`${location.protocol}//${location.hostname}:3030`);

    let enhancers : any[] = [];
    let middlewares : any[] = [ vottingMiddlewareService.manageRemote(this.socket) ];
    // ... add whatever other enhancers you want.

    if (__DEVMODE__) {
      // we probably only want to expose this tool in devMode.
      middlewares = [...middlewares, reduxLogger];
      if (devTools.isEnabled()) {
        enhancers = [ ...enhancers, devTools.enhancer() ];
      }
    }

    this.ngRedux.configureStore(rootReducer, APP_INITIAL_STATE, middlewares, enhancers);
    this.ngReduxRouter.initialize();
  }

  ngOnInit() {
    this.socket.on('state', (state : any) => this.vottingActionsService.setState(state) ); //set a callback for 'state' events in socket
    this.socket.on('clientRestart', () => this.vottingActionsService.clientRestart() ); //set a callback for 'clientRestart' events in socket
  }
}