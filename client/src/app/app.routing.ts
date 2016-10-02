import { Routes, RouterModule } from '@angular/router';

import {VottingComponent} from "./modules/voting/votting/votting.component";
import {ResultsComponent} from "./modules/voting/results/results.component";
import {WinnerComponent} from "./modules/voting/winner/winner.component";

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => new Promise((resolve : any) => {
      (require as any).ensure([], (require : any) => {
        resolve(require('./modules/voting/voting.module').default);
      });
    })
  },
  {
    path: 'users',
    loadChildren: () => new Promise((resolve : any) => {
      (require as any).ensure([], (require : any) => {
        resolve(require('./modules/users/users.module').default);
      });
    })
  }
];

export const routing = RouterModule.forRoot(appRoutes);
