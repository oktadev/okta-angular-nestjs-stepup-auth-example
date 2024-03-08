import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import { catchError, map, throwError } from 'rxjs';

interface Message {
  id: number;
  text: string;
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h1>My Messages</h1>
    <p>The GET messages call requires 2FA</p>
    @if(messages$ | async; as messages) {
      @if(messages.length > 0) {
        <table>
          <tr><th>Id</th><th>Message</th></tr>
        @for(message of messages; track message.id) {
          <tr>
            <td>{{message.id}}</td> <td>{{message.text}}</td>
          </tr>
        }
        </table>
      } @else {
        <p>No messages</p>
      }
    }
  `,
  styles: `
    :host { display: flex; flex-direction: column; align-items: center;}
    h1, p {font-weight: normal;}
    table {border: 1px solid lightgray; border-radius: 0.25rem; padding: 0.5rem;}
    th,td { padding: 0.5rem; }

  `
})
export class MessagesComponent {
  private http = inject(HttpClient);
  private oktaAuth = inject(OKTA_AUTH);
  private router = inject(Router);

  public messages$ = this.http.get<Message[]>('/api/messages').pipe(
    map(res => res || []),
    catchError(error => {
      console.log('here ', error)
      if (error['error'] === 'insufficient_user_authentication') {
        const acrValues = error['acr_values'];
        const redirectTo = this.router.routerState.snapshot.url;

        this.oktaAuth.setOriginalUri(redirectTo);
        this.oktaAuth.signInWithRedirect({acrValues});
      }
      return throwError(() => error);
    })
  );
}
