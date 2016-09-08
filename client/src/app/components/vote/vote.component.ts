import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'vote-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {
  private isVoted = false;
  @Input() item: string;
  @Output() voted: EventEmitter<any> = new EventEmitter();

  onVoted(item : string) {
    if (!this.isVoted) {
      this.voted.emit(item);
      this.isVoted = true;
    }
  }
}