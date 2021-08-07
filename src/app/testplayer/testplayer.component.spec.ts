import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestplayerComponent } from './testplayer.component';

describe('TestplayerComponent', () => {
  let component: TestplayerComponent;
  let fixture: ComponentFixture<TestplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
