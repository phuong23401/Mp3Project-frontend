import { TestBed } from '@angular/core/testing';

import { CommentPlayListService } from './comment-play-list.service';

describe('CommentPlayListService', () => {
  let service: CommentPlayListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentPlayListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
