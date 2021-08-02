import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewSongComponent } from './list-new-song.component';

describe('ListNewSongComponent', () => {
  let component: ListNewSongComponent;
  let fixture: ComponentFixture<ListNewSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNewSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNewSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
