import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RangeFightCalcComponent } from './range-fight-calc.component';

describe('RangeFightCalcComponent', () => {
  let component: RangeFightCalcComponent;
  let fixture: ComponentFixture<RangeFightCalcComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeFightCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeFightCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
