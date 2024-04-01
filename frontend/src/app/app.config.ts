import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CookieOptionsProvider } from 'ngx-cookie';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),provideClientHydration(withHttpTransferCacheOptions({
    includePostRequests: true 
  })), provideAnimationsAsync(),provideHttpClient(),CookieOptionsProvider]
};
