import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { IAppState } from '../../model/store';
import { setState, vote, next, restart, clientRestart } from '../../model/actions/votting';

@Injectable()
export class VottingActionsService {

  constructor ( private ngRedux: NgRedux<IAppState> ) {}

  /**
   * Dispatch to the reducer a new state of the model.
   * This action is not remote so we only affect the client state
   */
  setState(newState : any): void {
    this.ngRedux.dispatch<any>(setState(newState));
  }

  /**
   * Dispatch vote action
   * @param item (string) . The item voted
   * @param voter (string) . The username of the voter
   */
  vote(item : string, voter : string) : void {
    this.ngRedux.dispatch<any>(vote(item, voter));
  }

  /**
   * Dispatch next action
   */
  next() : void {
    this.ngRedux.dispatch<any>(next());
  }

  /**
   * Dispatch restart action
   */
  restart() : void {
    this.ngRedux.dispatch<any>(restart());
  }

  /**
   * Dispatch client restart action
   */
  clientRestart() : void {
    this.ngRedux.dispatch<any>(clientRestart());
  }

}