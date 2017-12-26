import { TestBed, inject } from '@angular/core/testing';

import { NoAuthenticationGuardService } from './no-authentication-guard.service';

describe('NoAuthenticationGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoAuthenticationGuardService]
    });
  });

  it('should be created', inject([NoAuthenticationGuardService], (service: NoAuthenticationGuardService) => {
    expect(service).toBeTruthy();
  }));
});
