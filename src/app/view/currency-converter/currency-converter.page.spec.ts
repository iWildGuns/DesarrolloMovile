import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyConverterPage } from './currency-converter.page';

describe('CurrencyConverterPage', () => {
  let component: CurrencyConverterPage;
  let fixture: ComponentFixture<CurrencyConverterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
