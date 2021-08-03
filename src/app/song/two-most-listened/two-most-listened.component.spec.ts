import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoMostListenedComponent } from './two-most-listened.component';

describe('TwoMostListenedComponent', () => {
  let component: TwoMostListenedComponent;
  let fixture: ComponentFixture<TwoMostListenedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoMostListenedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoMostListenedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
