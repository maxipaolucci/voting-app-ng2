import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';


import {LoginComponent} from './login/login.component';
import usersRoutes from './users.routing';

@NgModule({
  imports: [CommonModule, usersRoutes,FormsModule],
  declarations: [LoginComponent]
})
export default class UsersModule { }