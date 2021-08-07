import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPlayListComponent } from './comment-play-list.component';

describe('CommentPlayListComponent', () => {
  let component: CommentPlayListComponent;
  let fixture: ComponentFixture<CommentPlayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentPlayListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentPlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
