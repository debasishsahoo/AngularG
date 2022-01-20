import { TestBed } from '@angular/core/testing';

import { StaticpagesService } from './staticpages.service';

describe('StaticpagesService', () => {
  let service: StaticpagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticpagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
