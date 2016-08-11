import { Component } from '@angular/core';

@Component({
  selector: 'my-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent {
  hi = "hello!!!!";
}