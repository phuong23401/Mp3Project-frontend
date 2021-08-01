import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSongSearchComponent } from './list-song-search.component';

describe('ListSongSearchComponent', () => {
  let component: ListSongSearchComponent;
  let fixture: ComponentFixture<ListSongSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSongSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSongSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
