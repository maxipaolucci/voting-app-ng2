import { Injectable }       from '@angular/core';
import { DropdownQuestion } from '../question-dropdown';
import { QuestionBase }     from '../question-base';
import { TextboxQuestion }  from '../question-textbox';
import {Validators} from "@angular/forms";
@Injectable()
export class SigninQuestionService {
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions() {
    let questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        value: '',
        validators : [{
          fn: Validators.required,
          errorType: 'required',
          errorMessage: 'Name is required'
        }],
        required: true,
        order: 1
      }),
      new TextboxQuestion({
        key: 'username',
        label: 'Username',
        value: '',
        validators : [{
          fn: Validators.required,
          errorType: 'required',
          errorMessage: 'Username is required'
        }],
        required: true,
        order: 2
      }),
      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        validators : [{
          fn: Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'),
          errorType: 'pattern',
          errorMessage: 'Email should be a valid email address'
        }],
        order: 3
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}