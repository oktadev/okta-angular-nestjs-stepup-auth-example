import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <p>You're logged in!
      @if(name$ | async; as name) {
        <span>Welcome, {{name}} </span>
      }
    </p>
  `,
  styles: `
    p {
      text-align: center;
    }
  `
})
export class ProfileComponent {
  private oktaAuthStateService = inject(OktaAuthStateService);
  public name$ = this.oktaAuthStateService.authState$.pipe(
    filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
    map((authState: AuthState) => authState.idToken?.claims.name ?? '')
  );
}
