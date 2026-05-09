import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllCurrencyViewPage } from './all-currency-view.page';

describe('AllCurrencyViewPage', () => {
  let component: AllCurrencyViewPage;
  let fixture: ComponentFixture<AllCurrencyViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCurrencyViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
