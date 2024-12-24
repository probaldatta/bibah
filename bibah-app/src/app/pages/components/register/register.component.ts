import { JsonPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ColDirective,
  ContainerComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  FormLabelDirective,
  FormSelectDirective,
  RowComponent,
  TextColorDirective
} from '@coreui/angular';
import { RergistrationFormValidationService } from '../../../core/validation/validation.service';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../core/services/authenticate.service';

export class PasswordValidators {
  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');
    if (password?.valid && password?.value === confirm?.value) {
      confirm?.setErrors(null);
      return null;
    }
    confirm?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [RowComponent, ColComponent, ContainerComponent, ReactiveFormsModule, FormDirective, FormSelectDirective, NgIf, FormControlDirective, FormFeedbackComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, TextColorDirective, CardGroupComponent, CardComponent, CardBodyComponent, NgStyle, NgFor]

})
export class RegisterComponent {

  form!: FormGroup;
  submitted = false;
  formErrors: any;
  formControls!: string[];

  public _router = inject(Router);
  public _formBuilder = inject(FormBuilder);
  public _auth = inject(AuthenticateService);
  public _validationFormsService = inject(RergistrationFormValidationService);

  countryCodes = [
    { value: '+1', label: '+1' },
    { value: '+44', label: '+44' },
    { value: '+91', label: '+91' },
    { value: '+61', label: '+61' },
  ];

  constructor() {
    this.formErrors = this._validationFormsService.errorMessages;
    this.createForm();
  }

  createForm() {
    this.form = this._formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        countryCode: ['+91', [Validators.required]],
        mobile: ['', [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)  // Correct pattern for a 10-digit mobile number
        ]],
        password: [
          '', [
            Validators.required,
            Validators.minLength(this._validationFormsService.formRules.passwordMin),
            Validators.pattern(this._validationFormsService.formRules.passwordPattern)
          ]
        ],
        confirmPassword: [
          '', [
            Validators.required,
            Validators.minLength(this._validationFormsService.formRules.passwordMin),
            Validators.pattern(this._validationFormsService.formRules.passwordPattern)
          ]
        ],
        accept: [false, [Validators.requiredTrue]]
      },
      { validators: [PasswordValidators.confirmPassword] }
    );
    this.formControls = Object.keys(this.form.controls);
  }

  goToLogin() {
    this._router.navigate(['/login']);
  }

  onSubmit() {
    const data = this.form.value;
    if (this.form.valid) {
      this._auth.userRegistration(data).subscribe((res: any) => {
        console.log(res);
      });
    }
  }
}

