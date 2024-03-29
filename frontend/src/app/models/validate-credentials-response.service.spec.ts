import { TestBed } from '@angular/core/testing';

import { ValidateCredentialsResponseService } from './validate-credentials-response.service';

describe('ValidateCredentialsResponseService', () => {
  let service: ValidateCredentialsResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateCredentialsResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
