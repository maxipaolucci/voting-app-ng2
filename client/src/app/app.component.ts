import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = "Maxi";
  socket : any = null;

  ngOnInit() {
    this.socket = io(`${location.protocol}//${location.hostname}:3030`);
    this.socket.on('state', (state:any) => console.log(state));
  }
}