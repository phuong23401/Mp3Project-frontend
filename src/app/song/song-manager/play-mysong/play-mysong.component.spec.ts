import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayMysongComponent } from './play-mysong.component';

describe('PlayMysongComponent', () => {
  let component: PlayMysongComponent;
  let fixture: ComponentFixture<PlayMysongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayMysongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayMysongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
