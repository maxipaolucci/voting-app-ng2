import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {VottingActions} from "../../vottingActions.service";


@Component({
  selector: 'vote-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {
  @Input() item: string;

  constructor(private vottingActions: VottingActions) { }

  vote(item : string) : void {
    this.vottingActions.vote(item);
  }
}