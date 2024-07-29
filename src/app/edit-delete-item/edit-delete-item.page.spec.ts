import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDeleteItemPage } from './edit-delete-item.page';

describe('ExpenseTrackerPage', () => {
  let component: EditDeleteItemPage;
  let fixture: ComponentFixture<EditDeleteItemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeleteItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
