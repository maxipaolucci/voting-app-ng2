import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { List } from 'immutable';

import {VottingActions} from "../../vottingActions.service";

@Component({
  selector: 'votting-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './votting.component.html',
  styleUrls: ['./votting.component.scss']
})
export class VottingComponent {
  @Input() votePair : List<string>;

  constructor(private vottingActions: VottingActions) {}

  /**
   * Vote the item as parameter
   * @param item (string)
   */
  vote(item : string) : void {
    this.vottingActions.vote(item);
  }
}