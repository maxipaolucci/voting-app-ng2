import {Component, ChangeDetectionStrategy} from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'immutable';

import {VottingActionsService} from "../../services/vottingActions.service.ts";
import {Observable} from "rxjs/Rx";
import { select } from 'ng2-redux';

@Component({
  selector: 'votting-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './votting.component.html',
  styleUrls: ['./votting.component.scss']
})
export class VottingComponent{
  @select( ['vottingModel', 'vote', 'pair'] ) votePair: Observable<List<string>>; //vote pair data using path selector & immutable
  @select( ['vottingModel', 'lastVoted'] ) lastVoted: Observable<string>; //get lastVoted
  @select(['vottingModel', 'winner']) winner : Observable<string>;

  constructor(private vottingActionsService: VottingActionsService, private router: Router) {}
  
  ngOnInit() {
    this.lastVoted.subscribe(l => console.log(l));
    this.winner.subscribe(winner => {
      if (winner) {
        this.router.navigate(['/winner']);
      }
    });
  }
  
  /**
   * Vote the item as parameter
   * @param item (string)
   */
  vote(item : string) : void {
    this.vottingActionsService.vote(item);
  }
}