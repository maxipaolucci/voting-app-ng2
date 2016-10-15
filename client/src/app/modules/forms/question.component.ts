import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { QuestionBase }     from './question-base';

@Component({
  selector: 'question',
  templateUrl: 'question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  @Input() formErrors: any;
}