import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  
  constructor() {

    this.checkCurrentUser();

    Hub.listen('auth', ({payload}) => {
      if (payload.event === 'signedIn') {
        this.loggedIn$.next(true);
      } else if (payload.event === 'signedOut') {
        this.loggedIn$.next(false);
      }
    });
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  private async checkCurrentUser() {
    try {
      await getCurrentUser();
      this.loggedIn$.next(true);
    } catch {
      this.loggedIn$.next(false);
    }
  }

  async logout() {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out: ', error);
      
    }
  }
}
