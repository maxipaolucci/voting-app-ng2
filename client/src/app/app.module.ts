import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { NgRedux, DevToolsExtension } from 'ng2-redux';

import { AppComponent } from './app.component';
import {VottingActions} from "./vottingActions.service";
import {VottingComponent} from "./components/hello/votting.component";

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, VottingComponent ],
  bootstrap: [ AppComponent ],
  providers: [ NgRedux, DevToolsExtension, VottingActions ]
})
export class AppModule { }
