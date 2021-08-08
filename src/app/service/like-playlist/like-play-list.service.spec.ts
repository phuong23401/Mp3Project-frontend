import { TestBed } from '@angular/core/testing';

import { LikePlayListService } from './like-play-list.service';

describe('LikePlayListService', () => {
  let service: LikePlayListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikePlayListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
