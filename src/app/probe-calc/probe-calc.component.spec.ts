import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbeCalcComponent } from './probe-calc.component';

describe('ProbeCalcComponent', () => {
  let component: ProbeCalcComponent;
  let fixture: ComponentFixture<ProbeCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbeCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbeCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
