import {Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges} from '@angular/core';
import { List } from 'immutable';

import {VottingActions} from "../../vottingActions.service";
import {Observable} from "rxjs/Rx";
import { select } from 'ng2-redux';
import {IAppState} from "../../../model/store";

@Component({
  selector: 'votting-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './votting.component.html',
  styleUrls: ['./votting.component.scss']
})
export class VottingComponent implements OnChanges{
  @Input() votePair : List<string>;
  //@select( ['vottingModel', 'vote', 'pair'] ) votePair: Observable<List<string>>; //vote pair data using path selector & inmutable
  // @select( (state : IAppState) => {
  //   console.log(state.vottingModel.getIn(['vote', 'pair'], List<string>()));
  //   return state.vottingModel.getIn(['vote', 'pair'], List<string>());
  // } ) votePair: Observable<List<string>>; //vote pair data using fn selector & inmutable

  constructor(private vottingActions: VottingActions) {}

  /**
   * Vote the item as parameter
   * @param item (string)
   */
  vote(item : string) : void {
    this.vottingActions.vote(item);
  }

  ngOnChanges(changes : SimpleChanges) : void {
    console.log(changes['votePair']);
  }
}