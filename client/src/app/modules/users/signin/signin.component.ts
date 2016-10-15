import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {UsersService} from "../services/users.service.ts";
import {QuestionControlService} from "../../forms/services/question-control.service";
import {QuestionBase} from "../../forms/question-base";
import {SigninQuestionService} from "../../forms/services/signin-questions.service";


@Component({
  selector: 'signin-component',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [ QuestionControlService, SigninQuestionService ]
})
export class SigninComponent implements OnInit{
  questions: QuestionBase<any>[] = [];
  form: FormGroup;
  formErrors : any;
  validationMessages : any;

  payLoad = '';

  constructor(private usersService: UsersService,
              private router: Router,
              private qcs: QuestionControlService,
              private qs: SigninQuestionService ) {}

  ngOnInit() : void {
    this.questions = this.qs.getQuestions();
    this.form = this.qcs.toFormGroup(this.questions);
    this.formErrors = this.qcs.getFormErrors(this.questions);
    this.validationMessages = this.qcs.getValidationMessages(this.questions);
    this.form.valueChanges.subscribe( data => this.onValueChanged(data) );
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.form) {
      return;
    }

    const form = this.form;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}