import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReligionsComponent } from './manage-religions.component';

describe('ManageReligionsComponent', () => {
  let component: ManageReligionsComponent;
  let fixture: ComponentFixture<ManageReligionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageReligionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageReligionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
