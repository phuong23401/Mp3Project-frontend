import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestPlaylistComponent } from './latest-playlist.component';

describe('LatestPlaylistComponent', () => {
  let component: LatestPlaylistComponent;
  let fixture: ComponentFixture<LatestPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
