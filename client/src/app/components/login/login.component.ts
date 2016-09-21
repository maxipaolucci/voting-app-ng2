import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from "../../services/votingUsers.service";


@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private usersService: UsersService, private router: Router) {}

  /**
   * Login event handler. Tries to login with the username provided. If login is successful the redirects to
   * voting component
   *
   * @param username (string)
   */
  login(username : string) {
    this.usersService.login(username).then(data => {
      if (this.usersService.isLogedIn()) {
        this.router.navigate(['/voting']);
      } else {
        console.log(data);
      }

    }, error => {
      console.log(error);
    });
  }

}