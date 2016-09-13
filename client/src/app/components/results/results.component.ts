import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';
import { List, Map } from  'immutable';
import {select} from "ng2-redux/lib/index";
import {VottingActions} from "../../vottingActions.service";
import {Observable} from "rxjs/Rx";


@Component({
  selector: 'results-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  @select(['vottingModel', 'vote', 'pair']) votePair : Observable<List<string>>;
  @select(['vottingModel', 'vote', 'tally']) voteTally : Observable<Map<string, number>>;

  constructor(private vottingActions: VottingActions) {}
}