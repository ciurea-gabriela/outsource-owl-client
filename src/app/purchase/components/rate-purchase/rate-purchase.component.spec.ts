import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatePurchaseComponent } from './rate-purchase.component';

describe('RatePurchaseComponent', () => {
  let component: RatePurchaseComponent;
  let fixture: ComponentFixture<RatePurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatePurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
