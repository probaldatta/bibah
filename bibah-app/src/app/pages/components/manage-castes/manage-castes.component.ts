import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormLabelDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, GridModule, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, FormSelectDirective, TabDirective, TabPanelComponent, TabsComponent, TabsContentComponent, TabsListComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CasteService } from '../../../core/services/caste.service';
import { ReligionService } from '../../../core/services/religion.service';

@Component({
  selector: 'app-manage-castes',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormLabelDirective, FormCheckComponent,
    FormCheckInputDirective, FormCheckLabelDirective,
    FormControlDirective, FormSelectDirective,
    ReactiveFormsModule,
    FormsModule, GridModule,
    CardComponent, CardBodyComponent,
    TabPanelComponent,
    TabsListComponent,
    TabsComponent,
    TabDirective,
    TabPanelComponent,
    TabsComponent,
    TabsContentComponent,
    TabsListComponent,
    RowComponent,
    ColComponent, ButtonDirective,
    ReactiveFormsModule, NgFor, NgIf, NgStyle, ButtonDirective,
    IconDirective],
  templateUrl: './manage-castes.component.html'
})
export class ManageCastesComponent {
  public form!: FormGroup;
  public selectedReligion: any;
  public castes: any[] = [];
  public religions: any[] = [];
  public caste: any;
  public editMode = false;

  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;
  @ViewChild('myDiv') myDiv: ElementRef | undefined;
  divWidth: number = 0;

  private _formBuilder = inject(FormBuilder);
  private _casteService = inject(CasteService);
  private _religionService = inject(ReligionService);

  constructor() {
    this.createForm();
  }

  ngOnInit() {
    this.getReligions();
    //this.getCastes();
  }
  
  selectReligion(religion: any): void {
    this.selectedReligion = religion;
  }

  getReligions() {
    this._religionService.getReligions().subscribe({
      next: (response) => {
        this.religions = response;
        this.selectedReligion = this.religions[0];
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  createForm() {
    this.form = this._formBuilder.group(
      {
        religionId: [null, [Validators.required]],
        name: [null, [Validators.required]],
        active: [true, [Validators.required]],
      }
    );
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }
    this.addCaste();
  }

  addCaste() {
    console.log(this.form.value);
    this._casteService.addCaste(this.form.value).subscribe({
      next: (response) => {
        this.getReligions();
        this.createForm();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // getCastes() {
  //   this._casteService.getCastes().subscribe({
  //     next: (response) => {
  //       this.castes = response;
  //       console.log(this.castes);
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   });
  // }

  editCaste(caste: any) { }

  deleteCaste(casteId: any, religionId: any) {
    const body = { casteId, religionId };
    this._casteService.deleteCaste(body).subscribe({
      next: (response) => {
        this.getReligions();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateDivWidth();
    }, 0);
  }

  updateDivWidth() {
    if (this.myDiv) {
      this.divWidth = this.myDiv.nativeElement.offsetWidth - 40;
      console.log('Width of div:', this.divWidth);
    }
  }

  onResize() {
    this.updateDivWidth();
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    this.onScroll(event);
  }

  onScroll(event: WheelEvent): void {
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      container.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  }

  scrollLeft(): void {
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      container.scrollBy({ left: -215, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      container.scrollBy({ left: 215, behavior: 'smooth' });
    }
  }
}
