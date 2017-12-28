import { TestBed, inject } from '@angular/core/testing';

import { HomeAuthenticationResolverService } from './home-authentication-resolver.service';

describe('HomeAuthenticationResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeAuthenticationResolverService]
    });
  });

  it('should be created', inject([HomeAuthenticationResolverService], (service: HomeAuthenticationResolverService) => {
    expect(service).toBeTruthy();
  }));
});
