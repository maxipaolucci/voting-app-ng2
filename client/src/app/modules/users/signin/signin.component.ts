import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from "../services/users.service.ts";


@Component({
  selector: 'signin-component',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  submitted : boolean = false;
  active : boolean = true;

  constructor(private usersService: UsersService, private router: Router) {}

  onSubmit() {
    this.submitted = true;
  }


  reset() {
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}