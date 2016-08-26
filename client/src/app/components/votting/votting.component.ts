import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {IVottingState} from "../../../model/reducers/votting";
import { List } from 'Immutable';

@Component({
  selector: 'votting-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './votting.component.html',
  styleUrls: ['./votting.component.scss']
})
export class VottingComponent {
  @Input() vottingState: IVottingState;

  /**
   * Return the curret duple of items to vote
   * @returns {List<string>}
   */
  getVoteDuple() : List<string> {
    return this.vottingState.getIn(['vote', 'pair'], []);
  }
}