import { NgFor, NgIf, NgStyle } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormLabelDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, GridModule, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, TabPanelComponent, TabsListComponent, TabsComponent, TabsContentComponent, TabDirective } from '@coreui/angular';
import { ReligionService } from '../../../core/services/religion.service';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-manage-religions',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormLabelDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    FormControlDirective,
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    ReactiveFormsModule,
    NgFor, ButtonDirective,
    IconDirective],
  templateUrl: './manage-religions.component.html'
})
export class ManageReligionsComponent {
  
  public form!: FormGroup;
  public religions: any[] = [{
    _id: 1,
    name: 'Hinduism',
    religion: [
      { id: 1, name: 'Brahmin' },
      { id: 2, name: 'Kshatriya' },
      { id: 3, name: 'Vaishya' },
      { id: 4, name: 'Shudra' },
    ],
  },
  {
    _id: 2,
    name: 'Islam',
    religion: [
      { id: 1, name: 'Sunni' },
      { id: 2, name: 'Shia' },
    ],
  },
  {
    _id: 3,
    name: 'Christianity',
    religion: [
      { id: 1, name: 'Catholic' },
      { id: 2, name: 'Protestant' },
    ],
  },
  {
    _id: 4,
    name: 'Buddhism',
    religion: [
      { id: 1, name: 'Theravada' },
      { id: 2, name: 'Mahayana' },
    ],
  },];
  public religion: any;
  public editMode = false;


  private _formBuilder = inject(FormBuilder);
  private _religionService = inject(ReligionService);

  constructor() {
    this.createForm();
  }

  ngOnInit() {
    this.getReligions();
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
    this.addReligion();

  }

  addReligion() {
    this._religionService.addReligion(this.form.value).subscribe({
      next: () => {
        this.getReligions();
        this.createForm();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getReligions() {
    this._religionService.getReligions().subscribe({
      next: (response) => {
        console.log(response);
        this.religions = response;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  updateReligion() {
    console.log(this.religion);
    this._religionService.updateReligion(this.religion._id, this.form.value).subscribe({
      next: (response) => {
        if (response) {
          this.createForm();
          this.getReligions();
          this.editMode = false;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  editReligion(religionId: any) {
    this.editMode = true;
    this._religionService.getReligionById(religionId).subscribe({
      next: (response) => {
        this.religion = response;
        this.form.patchValue(this.religion);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteReligion(religionId: any) {
    this._religionService.deleteReligion(religionId).subscribe({
      next: () => {
        this.getReligions();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}




