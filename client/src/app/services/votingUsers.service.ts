import { Injectable }    from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {

  private serverUrl = 'http://localhost:3030';

  constructor(private jsonp: Jsonp) { }

  login(username : string) : Promise<any> {
    let body = JSON.stringify({ username });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });

    let params = new URLSearchParams();
    params.set('username', username);
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp.get(this.serverUrl + '/login', { search : params })
      .toPromise()
      .then((response : any) => {
        console.log(response.json());
        let data = response.json();
        if (data.success) {
          Promise.resolve({ logedIn : true});
        } else {
          let error = {
            logedIn : false,
            url : '/login',
            username,
            data
          };

          Promise.reject(error);
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

