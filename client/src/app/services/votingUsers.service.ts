import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  private usersUrl = '/users';  // URL to web api

  constructor(private http: Http) { }

  login(username) {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json().data /* as Hero[] */)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

