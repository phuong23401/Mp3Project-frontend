import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLikeSongsComponent } from './top-like-songs.component';

describe('TopLikeSongsComponent', () => {
  let component: TopLikeSongsComponent;
  let fixture: ComponentFixture<TopLikeSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopLikeSongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLikeSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
