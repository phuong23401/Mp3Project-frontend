import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/song/play-song/play-song.component.spec.ts
import { PlaySongComponent } from './play-song.component';

describe('PlaySongComponent', () => {
  let component: PlaySongComponent;
  let fixture: ComponentFixture<PlaySongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaySongComponent ]
=======
import { CheckComponent } from './check.component';

describe('CheckComponent', () => {
  let component: CheckComponent;
  let fixture: ComponentFixture<CheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckComponent ]
>>>>>>> efce778cdf64a03bba8a6f887d2196874458dff6:src/app/service/auth/check/check.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:src/app/song/play-song/play-song.component.spec.ts
    fixture = TestBed.createComponent(PlaySongComponent);
=======
    fixture = TestBed.createComponent(CheckComponent);
>>>>>>> efce778cdf64a03bba8a6f887d2196874458dff6:src/app/service/auth/check/check.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
