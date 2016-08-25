import { platformBrowserDynamic  } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import {__PRODMODE__} from "./constants/config";

if (__PRODMODE__) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
