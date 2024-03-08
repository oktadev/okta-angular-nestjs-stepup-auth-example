import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { stepupInterceptor } from './stepup.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      OktaAuthModule.forRoot({
        oktaAuth: new OktaAuth({
          issuer: 'https://{yourOktaDomain}/oauth2/default',
          clientId: '{yourClientId}',
          scopes: ['openid', 'profile', 'offline_access'],
          redirectUri: `${window.location.origin}/login/callback`
        })
      })
    ]),
    provideHttpClient(withInterceptors([
      authInterceptor,
      stepupInterceptor
    ]))
  ]
};
