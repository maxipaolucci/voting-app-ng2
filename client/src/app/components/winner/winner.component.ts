import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";


@Component({
  selector: 'winner-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent {
  //@Input() winner: string;
  @select(['vottingModel', 'winner']) winner : Observable<string>;
}