import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, GridModule, FormControlDirective, FormLabelDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective } from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-manage-languages',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormLabelDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    FormControlDirective,
    ReactiveFormsModule,
    FormsModule, GridModule,
    CardComponent,
    CardBodyComponent, RowComponent,
    ColComponent, ButtonDirective,
    IconDirective, ReactiveFormsModule, NgFor,],
  templateUrl: './manage-languages.component.html'
})
export class ManageLanguagesComponent implements OnInit {
  public form!: FormGroup;
  public languages: any[] = [];
  public language: any;
  public editMode = false;

  private _formBuilder = inject(FormBuilder);
  private _languageService = inject(LanguageService);

  constructor() {
    this.createForm();
  }

  ngOnInit() {
    this.getLanguages();
  }

  createForm() {
    this.form = this._formBuilder.group(
      {
        name: ['', [Validators.required]],
        active: [true, [Validators.required]],
      }
    );
  }


  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.editMode) {
      this.updateLanguage();
    } else {
      this.addLanguage();
    }
  }

  addLanguage() {
    this._languageService.addLanguage(this.form.value).subscribe({
      next: (response) => {
        this.createForm();
        this.getLanguages();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  updateLanguage() {
    console.log(this.language);
    this._languageService.updateLanguage(this.language._id, this.form.value).subscribe({
      next: (response) => {
        if (response) {
          this.createForm();
          this.getLanguages();
          this.editMode = false;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  editLanguage(languageId: any) {
    this.editMode = true;
    this._languageService.getLanguageById(languageId).subscribe({
      next: (response) => {
        this.language = response;
        this.form.patchValue(this.language);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteLanguage(languageId: any) {
    this._languageService.deleteLanguage(languageId).subscribe({
      next: (response) => {
        this.getLanguages();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getLanguages() {
    this._languageService.getLanguages().subscribe({
      next: (response) => {
        this.languages = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
