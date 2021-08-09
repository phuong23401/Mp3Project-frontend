import { TestBed } from '@angular/core/testing';

import { AddSongDialogService } from './add-song-dialog.service';

describe('AddSongDialogService', () => {
  let service: AddSongDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddSongDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
