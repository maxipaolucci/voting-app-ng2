import { Injectable } from '@angular/core';
import {IAction} from "../../model/actions/action";
import {IAppState} from "../../model/store";
import {NgRedux} from "ng2-redux/lib/index";

@Injectable()
export class VottingMiddlewareService {
  constructor() {}

  manageRemote = (socket : any) => (store : NgRedux<IAppState>) => (next : any) => (action : IAction) => {
    if (action.meta && action.meta.remote) {
      console.log(`emiting action to server...`);
      socket.emit('action', action);
    }
    return next(action);
  }
}