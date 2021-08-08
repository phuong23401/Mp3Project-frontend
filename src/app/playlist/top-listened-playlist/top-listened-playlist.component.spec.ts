import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopListenedPlaylistComponent } from './top-listened-playlist.component';

describe('TopListenedPlaylistComponent', () => {
  let component: TopListenedPlaylistComponent;
  let fixture: ComponentFixture<TopListenedPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopListenedPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopListenedPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
