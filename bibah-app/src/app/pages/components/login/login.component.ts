import { CommonModule, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, CardGroupComponent, ColComponent, ContainerComponent, FormControlDirective, FormDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, RowComponent, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AuthenticateService } from '../../../core/services/authenticate.service';
import { LoginFormValidationService, RergistrationFormValidationService } from '../../../core/validation/validation.service';
import { PasswordValidators } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormFeedbackComponent, FormDirective, ReactiveFormsModule, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {
  public isCustomerLogin = false;
  public form!: FormGroup;
  public submitted = false;
  public formErrors: any;
  public formControls!: string[];
  
  public _router = inject(Router);
  public _formBuilder = inject(FormBuilder);
  public _auth = inject(AuthenticateService);
  public _validationFormsService = inject(LoginFormValidationService);

  constructor(
  ) {
    this.formErrors = this._validationFormsService.errorMessages;
    this.createForm();
  }

  goToRegister() {
    this._router.navigate(['/register'])
  }

  createForm() {
    this.form = this._formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    );
    this.formControls = Object.keys(this.form.controls);
  }

  onSubmit() {
    if (this.form.valid) {
      this._auth.userLogin(this.form.value.email, this.form.value.password).subscribe((res: any) => {
        if (res) {
          this._router.navigate(['control-panel/dashboard']);
        }
      });
    }
  }
}
