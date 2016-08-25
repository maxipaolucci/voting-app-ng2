import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { IAppState } from '../model/store';
import { setState } from '../model/actions/vote';

@Injectable()
export class VottingActions {

  static SET_STATE: string = 'SET_STATE';

  constructor ( private ngRedux: NgRedux<IAppState> ) {}

  // Basic action
  setState(newState : any): void {
    this.ngRedux.dispatch<any>(setState(newState));
  }

}