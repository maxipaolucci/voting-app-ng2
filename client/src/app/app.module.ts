import { NgModule } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import {NgReduxRouter} from "ng2-redux-router/index";

import { AppComponent } from './app.component';
import {VottingComponent} from "./components/votting/votting.component";
import {VoteComponent} from "./components/vote/vote.component";
import {ResultsComponent} from "./components/results/results.component";
import {WinnerComponent} from "./components/winner/winner.component";
import {VottingActionsService} from "./services/vottingActions.service.ts";
import {LoginComponent} from "./components/login/login.component";

import {routing} from "./app.routing";

import '../styles.global.scss';


@NgModule({
  imports: [
    BrowserModule,
    routing
  ],

  declarations: [
    AppComponent,
    VottingComponent,
    VoteComponent,
    ResultsComponent,
    WinnerComponent,
    LoginComponent
  ],

  providers: [
    Title,
    NgRedux,
    NgReduxRouter,
    DevToolsExtension,
    VottingActionsService
  ],

  bootstrap: [ AppComponent ]
})
export class AppModule { }
