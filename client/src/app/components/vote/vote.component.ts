import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {IVottingState} from "../../../model/reducers/votting";

@Component({
  selector: 'vote-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {
  @Input() movie: string;
}