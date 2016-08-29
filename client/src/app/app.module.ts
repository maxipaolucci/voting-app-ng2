import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { NgRedux, DevToolsExtension } from 'ng2-redux';

import { AppComponent } from './app.component';
import {VottingActions} from "./vottingActions.service";
import {VottingComponent} from "./components/votting/votting.component";
import {VoteComponent} from "./components/vote/vote.component";

import '../styles.global.scss';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, VottingComponent, VoteComponent ],
  bootstrap: [ AppComponent ],
  providers: [ NgRedux, DevToolsExtension, VottingActions ]
})
export class AppModule { }
