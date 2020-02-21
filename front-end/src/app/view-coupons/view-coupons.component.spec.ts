import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCouponsComponent } from './view-coupons.component';

describe('ViewCouponsComponent', () => {
  let component: ViewCouponsComponent;
  let fixture: ComponentFixture<ViewCouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
