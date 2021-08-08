import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLikePlaylistComponent } from './top-like-playlist.component';

describe('TopLikePlaylistComponent', () => {
  let component: TopLikePlaylistComponent;
  let fixture: ComponentFixture<TopLikePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopLikePlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLikePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
