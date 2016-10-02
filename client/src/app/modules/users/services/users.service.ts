import { Injectable }    from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class UsersService {

  private serverUrl : string = 'http://localhost:3030';
  private loggedIn : boolean = false; // loggedin state
  public username$ : BehaviorSubject<string> = new BehaviorSubject<string>(null); //observable username of the person that is logged in the system

  constructor(private jsonp: Jsonp) { }

  logout() {
    this.username$.next(null);
    this.loggedIn = false;
  }

  login(username : string) : Promise<any> {
    let params = new URLSearchParams();
    params.set('username', username);
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp.get(this.serverUrl + '/users/login', { search : params })
      .toPromise()
      .then((response : any) => {
        let data = response.json();

        if (data.status === 'success') {
          this.loggedIn = true;
          this.username$.next(username);
          return { loggedIn : true };
        } else {
          this.loggedIn = false;
          this.username$.next(null);
          let error = {
            loggedIn : false,
            url : this.serverUrl + '/users/login',
            username,
            data
          };

          return error;
        }
      })
      .catch((error) => {
        this.loggedIn = false;
        this.username$.next(null);
        return this.handleError(error);
      });
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  /**
   * return the loggedin state
   * @returns {boolean}
   */
  isLogedIn() : boolean {
    return this.loggedIn;
  }

  /**
   * return the username of the loggedin person
   * @returns {string}
   */
  getUsername() : string {
    return this.username$.getValue();
  }
}

