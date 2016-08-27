import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as io from 'socket.io-client';
import {NgRedux, select, DevToolsExtension} from 'ng2-redux';
import { Observable } from 'rxjs';

import rootReducer from '../model/store';
import { IVottingState } from '../model/reducers/votting';
import { IAppState, APP_INITIAL_STATE } from '../model/store';
import reduxLogger from '../model/configureLogger';

import { __DEVMODE__ } from "../constants/config";
import {VottingActions} from "./vottingActions.service";
import {VottingMiddleware} from "./vottingMiddleware.service";

import '../../public/css/styles.css';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./bootstrap3.scss', './app.component.scss'],
  providers: [ VottingMiddleware ]
})
export class AppComponent implements OnInit {
  name = "Maxi";
  socket : any = null;
  @select((state : IAppState) => state.vottingModel) vottingState: Observable<IVottingState>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private vottingActions: VottingActions,
    private vottingMiddleware: VottingMiddleware) {

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
    this.socket.on('state', (state : any) => this.vottingActions.setState(state) );
  }
}