import { Injectable }    from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {

  private serverUrl : string = 'http://localhost:3030';
  private loggedIn : boolean = false; // loggedin state
  private username : string = null; //username of the person that is logged in the system

  constructor(private jsonp: Jsonp) { }

  login(username : string) : Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let params = new URLSearchParams();
    params.set('username', username);
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp.get(this.serverUrl + '/users/login', { search : params })
      .toPromise()
      .then((response : any) => {
        let data = response.json();

        if (data.status === 'success') {
          this.loggedIn = true;
          this.username = username;
          return { logedIn : true };
        } else {
          this.loggedIn = false;
          this.username = null;
            let error = {
            logedIn : false,
            url : '/login',
            username,
            data
          };

          return error;
        }
      })
      .catch((error) => {
        this.loggedIn = false;
        this.username = null;
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
    return this.username;
  }
}

