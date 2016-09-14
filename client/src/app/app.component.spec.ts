import { addProviders, inject } from '@angular/core/testing';
import { Title }  from '@angular/platform-browser';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import {VottingActions} from "./vottingActions.service";
import { AppComponent } from './app.component';
import {NgReduxRouter} from "ng2-redux-router/index";

describe('App', () => {
  beforeEach(() => {
    addProviders([
      AppComponent, Title, NgRedux, DevToolsExtension, VottingActions, NgReduxRouter
    ]);
  });
  it ('should work', inject([AppComponent], (app: AppComponent) => {
    // Add real test here
    expect(2).toBe(2);
  }));
});
