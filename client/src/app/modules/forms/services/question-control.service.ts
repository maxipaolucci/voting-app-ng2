import { Injectable }   from '@angular/core';
import {FormControl, FormGroup, Validators, ValidatorFn} from '@angular/forms';

import { QuestionBase } from '../question-base';

@Injectable()
export class QuestionControlService {

  constructor() { }

  /**
   * Return a FormGroup instance based on the fields provided as questions
   * @param questions
   * @returns {FormGroup}
   */
  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      let validators : ValidatorFn[] = [];
      if (question.validators) {
        question.validators.forEach(validator => {
          validators.push(validator.fn);
        });
      }

      group[question.key] = new FormControl(question.value || '', validators);
    });
    
    return new FormGroup(group);
  }

  /**
   * Return the validation messages for each validator on each question in the form
   * @param questions
   * @returns {any}
   */
  getValidationMessages(questions: QuestionBase<any>[]) {
    let messages : any = {}
    questions.forEach(question => {
      if (question.validators.length) {
        messages[question.key] = {};
        question.validators.forEach(validator => {
          messages[question.key][validator.errorType] = validator.errorMessage;
        });
      }
    });

    return messages;
  }

  /**
   * Return a formErrors JS object indexed by key for each question provided
   * @param questions
   * @returns {FormGroup}
   */
  getFormErrors(questions: QuestionBase<any>[]) {
    let group: any = {};

    questions.forEach(question => {
      if (question.validators.length) {
        group[question.key] = '';
      }
    });

    return group;
  }
}