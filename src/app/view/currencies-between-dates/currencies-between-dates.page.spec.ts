import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrenciesBetweenDatesPage } from './currencies-between-dates.page';

describe('CurrenciesBetweenDatesPage', () => {
  let component: CurrenciesBetweenDatesPage;
  let fixture: ComponentFixture<CurrenciesBetweenDatesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesBetweenDatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
