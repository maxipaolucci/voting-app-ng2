import { Component, ChangeDetectionStrategy } from '@angular/core';
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";


@Component({
  selector: 'winner-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent {
  @select(['vottingModel', 'winner']) winner : Observable<string>;
}