import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VottingComponent} from "./votting/votting.component";
import {VoteComponent} from "./vote/vote.component";
import {ResultsComponent} from "./results/results.component";
import {WinnerComponent} from "./winner/winner.component";

import votingRoutes from './voting.routing';


@NgModule({
  imports: [CommonModule, votingRoutes],
  declarations: [
    VottingComponent,
    VoteComponent,
    ResultsComponent,
    WinnerComponent
  ]
})
export default class VotingModule { }