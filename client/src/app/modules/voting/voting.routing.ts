import { Routes, RouterModule } from '@angular/router';

import {VottingComponent} from "./votting/votting.component";
import {ResultsComponent} from "./results/results.component";
import {WinnerComponent} from "./winner/winner.component";

const routes : Routes = [
  { path: '', redirectTo: '/voting', pathMatch: 'full' },
  { path: 'voting', component: VottingComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'winner', component: WinnerComponent },
];

export default RouterModule.forChild(routes);