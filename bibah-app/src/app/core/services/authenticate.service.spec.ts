import { TestBed } from '@angular/core/testing';

import { AuthenticateService } from './authenticate.service';

describe('AccountService', () => {
  let service: AuthenticateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
