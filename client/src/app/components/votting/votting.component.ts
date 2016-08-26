import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {IVottingState} from "../../../model/reducers/votting";

@Component({
  selector: 'votting-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './votting.component.html',
  styleUrls: ['./votting.component.scss']
})
export class VottingComponent {
  @Input() vottingState: IVottingState;
}