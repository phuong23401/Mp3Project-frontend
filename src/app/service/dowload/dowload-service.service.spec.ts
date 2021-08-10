import { TestBed } from '@angular/core/testing';

import { DowloadServiceService } from './dowload-service.service';

describe('DowloadServiceService', () => {
  let service: DowloadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DowloadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
