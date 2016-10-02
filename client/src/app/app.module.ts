import { NgModule } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import {NgReduxRouter} from "ng2-redux-router";

import { AppComponent } from './app.component';
import {HeaderComponent} from "./components/header/header.component";

import {VottingActionsService} from "./modules/voting/services/vottingActions.service.ts";
import {UsersService} from "./modules/users/services/users.service.ts";

import {routing} from "./app.routing";

import '../styles.global.scss';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    routing
  ],

  declarations: [
    AppComponent,
    HeaderComponent
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