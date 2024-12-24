import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';

@Component({
  selector: 'app-primary-footer',
  standalone: true,
  imports: [],
  templateUrl: './primary-footer.component.html',
})
export class PrimaryFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
