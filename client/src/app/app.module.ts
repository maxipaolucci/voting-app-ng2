import { NgModule } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import {NgReduxRouter} from "ng2-redux-router/index";

import { AppComponent } from './app.component';
import {VottingActions} from "./vottingActions.service";
import {VottingComponent} from "./components/votting/votting.component";
import {VoteComponent} from "./components/vote/vote.component";
import {ResultsComponent} from "./components/results/results.component";
import {WinnerComponent} from "./components/winner/winner.component";
import {routing} from "./app.routing";

import '../styles.global.scss';


@NgModule({
  imports: [ BrowserModule, routing ],
  declarations: [ AppComponent, VottingComponent, VoteComponent, ResultsComponent, WinnerComponent ],
  bootstrap: [ AppComponent ],
  providers: [ Title, NgRedux, NgReduxRouter, DevToolsExtension, VottingActions ]
})
export class AppModule { }
