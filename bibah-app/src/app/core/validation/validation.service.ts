import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RergistrationFormValidationService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    passwordMin: 6,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
  };

  formErrors = {
    firstName: '',
    lastName: '',
    countryCode: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    accept: false
  };

  constructor() {
    this.errorMessages = {
      firstName: {
        required: 'First name is required'
      },
      lastName: {
        required: 'Last name is required'
      },
      mobile: {
        required: 'Mobile number is required',
        pattern: 'Invalid mobile number'
      },
      email: {
        required: 'required',
        email: 'Invalid email address'
      },
      password: {
        required: 'Password is required',
        pattern: 'Password must contain: numbers, uppercase and lowercase letters',
        minLength: `Password must be at least ${this.formRules.passwordMin} characters`
      },
      confirmPassword: {
        required: 'Password confirmation is required',
        passwordMismatch: 'Passwords must match'
      },
      accept: {
        requiredTrue: 'You have to accept our Terms and Conditions'
      }
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginFormValidationService {

  errorMessages: any;

  formRules = {
    emailPattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  };

  formErrors = {
    email: '',
    password: ''
  };

  constructor() {
    this.errorMessages = {
      email: {
        required: 'Email is required',
        email: 'Invalid email address'
      },
      password: {
        required: 'Password is required'
      }
    };
  }

  validateLoginForm(formValues: any) {
    const errors: any = {};
    if (!formValues.email) {
      errors.loginEmail = this.errorMessages.email.required;
    } else if (!this.formRules.emailPattern.test(formValues.email)) {
      errors.email = this.errorMessages.email.email;
    }
    if (!formValues.password) {
      errors.password = this.errorMessages.password.required;
    }

    return errors;
  }
}
