import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {InitService} from "./services/init.service";
import {provideHttpClient} from "@angular/common/http"

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [InitService],
      useFactory: appInit
    }
  ]
};

function appInit(initService: InitService) {
  return (): Promise<any> => {
    return initService.init();
  }
}
