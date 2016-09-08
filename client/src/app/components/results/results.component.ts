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
export class ResultsComponent implements OnInit {
  private tally : Map<string, number> = null;
  @select(['vottingModel', 'vote', 'pair']) votePair : Observable<List<string>>;
  @select(['vottingModel', 'vote', 'tally']) voteTally : Observable<Map<string, number>>;

  constructor(private vottingActions: VottingActions) {}

  ngOnInit() {
    //we subscribe to this observable to receive the tally async
    this.voteTally.subscribe((value : Map<string, number>) => this.tally = value );
  }

  /**
   * Returns the amount of votes from an item in the current pair
   * @param item (string). The item we are looking at
   * @returns {number}
   */
  getVotes(item : string) : number {
    //check for the tally to be not null (before voteTally gets a value from the server)
    if (this.tally ) {
      return this.tally.get(item, 0);
    }

    return 0;
  }
}