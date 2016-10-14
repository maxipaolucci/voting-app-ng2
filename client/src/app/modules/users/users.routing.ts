import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from "./login/login.component";
import {SigninComponent} from "./signin/signin.component";

const routes : Routes = [
  { path : 'login', component : LoginComponent },
  { path : 'signin', component : SigninComponent }
];

export default RouterModule.forChild(routes);