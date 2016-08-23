import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { NgRedux } from 'ng2-redux';

import { AppComponent } from './app.component';
import { HelloComponent } from "./components/hello/hello.component";

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap: [ AppComponent ],
  providers: [ NgRedux ]
})
export class AppModule { }
