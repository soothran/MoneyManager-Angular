import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrpExpenseComponent } from './add-grp-expense.component';

describe('AddGrpExpenseComponent', () => {
  let component: AddGrpExpenseComponent;
  let fixture: ComponentFixture<AddGrpExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGrpExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGrpExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
