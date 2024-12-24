import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCastesComponent } from './manage-castes.component';

describe('ManageCastesComponent', () => {
  let component: ManageCastesComponent;
  let fixture: ComponentFixture<ManageCastesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCastesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCastesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
