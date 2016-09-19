import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {

  private serverUrl = 'http://localhost:3030';

  constructor(private http: Http) { }

  login(username : string) : Promise<any> {
    let body = JSON.stringify({ username });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });

    return this.http.post(this.serverUrl + '/login', body, options)
      .toPromise()
      .then(response => {
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

