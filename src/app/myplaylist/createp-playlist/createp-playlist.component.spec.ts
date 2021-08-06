import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepPlaylistComponent } from './createp-playlist.component';

describe('CreatepPlaylistComponent', () => {
  let component: CreatepPlaylistComponent;
  let fixture: ComponentFixture<CreatepPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatepPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
