import { Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [OktaAuthGuard],
    data: {okta: { acrValues: 'urn:okta:loa:2fa:any'}}
  },
  { path: 'messages', component: MessagesComponent, canActivate: [OktaAuthGuard] },
  { path: 'login/callback', component: OktaCallbackComponent }
];
