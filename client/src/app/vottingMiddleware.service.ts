import { Injectable } from '@angular/core';
import {IAction} from "../model/actions/action";
import {IAppState} from "../model/store";
import {NgRedux} from "ng2-redux/lib/index";

@Injectable()
export class VottingMiddleware {
  constructor() {}

  manageRemote = (socket : any) => (store : NgRedux<IAppState>) => (next : any) => (action : IAction) => {
    console.log(`middleware action: `, action);
    if (action.meta && action.meta.remote) {
      console.log(`emiting action to server...`);
      socket.emit('action', action);
    }
    return next(action);
  }
}