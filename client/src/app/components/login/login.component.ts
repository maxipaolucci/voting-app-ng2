import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from "../../services/votingUsers.service";


@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usernameValue : string = '';
  showInvalidUsernameMsg : boolean = false;
  submitted : boolean = false;
  active : boolean = true;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {}

  /**
   * Login event handler. Tries to login with the username provided. If login is successful the redirects to
   * voting component
   *
   * @param username (string)
   */
  login() {
    this.showInvalidUsernameMsg = false;
    this.usersService.login(this.usernameValue).then(data => {
      if (this.usersService.isLogedIn()) {
        this.router.navigate(['/voting']);
      } else {
        this.showInvalidUsernameMsg = true;
        console.log(data);
      }

    }, error => {
      this.showInvalidUsernameMsg = true;
      console.log(error);
    });
  }

  onSubmit() {
    this.submitted = true;
    this.login();
  }


  reset() {
    this.showInvalidUsernameMsg = true;
    this.usernameValue = '';
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}