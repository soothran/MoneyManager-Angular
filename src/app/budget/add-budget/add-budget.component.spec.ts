import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetComponent } from './add-budget.component';

describe('AddBudgetComponent', () => {
  let component: AddBudgetComponent;
  let fixture: ComponentFixture<AddBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
