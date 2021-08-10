import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentPlaylistAthomeComponent } from './coment-playlist-athome.component';

describe('ComentPlaylistAthomeComponent', () => {
  let component: ComentPlaylistAthomeComponent;
  let fixture: ComponentFixture<ComentPlaylistAthomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentPlaylistAthomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentPlaylistAthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
