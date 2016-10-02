import {Component, ChangeDetectionStrategy} from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'immutable';

import {VottingActionsService} from "../services/vottingActions.service.ts";
import {Observable} from "rxjs/Rx";
import { select } from 'ng2-redux';
import {UsersService} from "../../../modules/users/services/users.service.ts";

@Component({
  selector: 'votting-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './votting.component.html',
  styleUrls: ['./votting.component.scss']
})
export class VottingComponent{
  @select( ['vottingModel', 'vote', 'pair'] ) votePair: Observable<List<string>>; //vote pair data using path selector & immutable
  @select( ['vottingModel', 'vote', 'votedBy'] ) votedBy: Observable<any>; //get lastVoted
  @select(['vottingModel', 'winner']) winner : Observable<string>;
  private votedByUser : string = '';

  constructor(
    private vottingActionsService: VottingActionsService,
    private usersService: UsersService,
    private router: Router
  ) {}
  
  ngOnInit() {
    //check loggedIn user
    if (!this.usersService.isLogedIn()) {
      this.router.navigate(['/users/login']);
    }

    //subscribe to winner value
    this.winner.subscribe(winner => {
      if (winner) {
        this.router.navigate(['/winner']);
      }
    });

    this.votedBy.subscribe(votedBy => {
      if (votedBy) {
        this.votedByUser = votedBy.get(this.usersService.getUsername(), '');
      } else {
        this.votedByUser = '';
      }
    });
  }
  
  /**
   * Vote the item as parameter
   * @param item (string)
   */
  vote(item : string) : void {
    this.vottingActionsService.vote(item, this.usersService.getUsername());
  }
}