import { TestBed } from '@angular/core/testing';

import { AccountserviceService } from './accountservice.service';

describe('AccountserviceService', () => {
  let service: AccountserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
