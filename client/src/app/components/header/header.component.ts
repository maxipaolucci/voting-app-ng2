import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {UsersService} from "../../modules/users/services/users.service.ts";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  private title : string = "Voting App";
  private username : string = null;
  
  constructor(private titleService : Title,
              private usersService : UsersService,
              private router: Router) {
    //set title
    this.titleService.setTitle(this.title);
  }
  
  ngOnInit() {
    this.usersService.username$.subscribe((username : string) => {
      this.username = username;
    })
  }

  logout($event : any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.usersService.logout();
    this.router.navigate(['/login']);
  }
}
