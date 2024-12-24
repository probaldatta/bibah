import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticateService } from '../../../core/services/authenticate.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './roles.component.html'
})
export class RolesComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private _auth: AuthenticateService) {

    this.form = this.fb.group({
      name: ['', Validators.required],
    });
   }

  

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      this._auth.createRole(this.form.value).subscribe((res: any) => {
        console.log(res);
      });
    }
  }
}
