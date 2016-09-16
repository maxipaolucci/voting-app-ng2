import { Routes, RouterModule } from '@angular/router';

import {VottingComponent} from "./components/votting/votting.component";
import {ResultsComponent} from "./components/results/results.component";
import {WinnerComponent} from "./components/winner/winner.component";
import {LoginComponent} from "./components/login/login.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/voting',
    pathMatch: 'full'
  },
  {
    path: 'voting',
    component: VottingComponent
  },
  {
    path: 'results',
    component: ResultsComponent
  },
  {
    path: 'winner',
    component: WinnerComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);
