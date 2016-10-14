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
  signinForm: FormGroup;
  payLoad = '';

  constructor(private usersService: UsersService,
              private router: Router,
              private qcs: QuestionControlService,
              private qs: SigninQuestionService ) {}

  ngOnInit() : void {
    this.questions = this.qs.getQuestions();
    this.signinForm = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.signinForm.value);
  }
}