import { NgModule } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import {NgReduxRouter} from "ng2-redux-router";

import { AppComponent } from './app.component';
import {VottingComponent} from "./components/votting/votting.component";
import {VoteComponent} from "./components/vote/vote.component";
import {ResultsComponent} from "./components/results/results.component";
import {WinnerComponent} from "./components/winner/winner.component";
import {HeaderComponent} from "./components/header/header.component";

import {VottingActionsService} from "./services/vottingActions.service.ts";
import {UsersService} from "./modules/users/services/users.service.ts";

import {routing} from "./app.routing";

import '../styles.global.scss';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing
  ],

  declarations: [
    AppComponent,
    HeaderComponent,
    VottingComponent,
    VoteComponent,
    ResultsComponent,
    WinnerComponent
  ],

  providers: [
    Title,
    NgRedux,
    NgReduxRouter,
    DevToolsExtension,
    VottingActionsService,
    UsersService
  ],

  bootstrap: [ AppComponent ]
})
export class AppModule { }