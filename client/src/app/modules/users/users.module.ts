import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import usersRoutes from './users.routing';
import {LoginComponent} from './login/login.component';
import {SigninComponent} from "./signin/signin.component";
import {QuestionComponent} from "../forms/question.component";


@NgModule({
  imports: [CommonModule, usersRoutes, FormsModule, ReactiveFormsModule ],
  declarations: [LoginComponent, SigninComponent, QuestionComponent]
})
export default class UsersModule { }