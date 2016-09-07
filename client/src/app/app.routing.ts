import { Routes, RouterModule } from '@angular/router';

import {VottingComponent} from "./components/votting/votting.component";
import {ResultsComponent} from "./components/results/results.component";

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
  }
];

export const routing = RouterModule.forRoot(appRoutes);
