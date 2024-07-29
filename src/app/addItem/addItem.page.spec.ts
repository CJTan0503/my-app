import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddItemPage } from './addItem.page';

describe('ExpenseTrackerPage', () => {
  let component: AddItemPage;
  let fixture: ComponentFixture<AddItemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
