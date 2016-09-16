import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {VottingActionsService} from "../../services/vottingActions.service.ts";


@Component({
  selector: 'login-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private vottingActions: VottingActionsService, private router: Router) {}

  login(username : string) {
    //this.vottingActions.login(username);
  }

}