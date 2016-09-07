import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {IVottingState} from "../../../model/reducers/votting";
import { List } from 'Immutable';
import {VottingActions} from "../../vottingActions.service";

@Component({
  selector: 'votting-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './votting.component.html',
  styleUrls: ['./votting.component.scss']
})
export class VottingComponent {
  @Input() vottingState: IVottingState;

  constructor(private vottingActions: VottingActions) {}

  /**
   * Return the curret duple of items to vote
   * @returns {List<string>}
   */
  getVoteDuple() : List<string> {
    return this.vottingState.getIn(['vote', 'pair'], []);
  }

  vote(item : string) : void {
    this.vottingActions.vote(item);
  }
}