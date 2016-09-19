import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {VottingActionsService} from "../../services/vottingActions.service.ts";
import {UsersService} from "../../services/votingUsers.service";


@Component({
  selector: 'login-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private usersService: UsersService, private router: Router) {}

  login(username : string) {
    this.usersService.login(username).then(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

}