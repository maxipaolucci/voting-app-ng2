import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";


@Component({
  selector: 'winner-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent implements OnInit {
  @select(['vottingModel', 'winner']) winner : Observable<string>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.winner.subscribe(winner => {
      console.log(winner);
      console.log(this.router.isActive('/winner', true));
      if (!winner && this.router.isActive('/winner', true)) {
        this.router.navigate(['/voting']);
      }
    });
  }
}