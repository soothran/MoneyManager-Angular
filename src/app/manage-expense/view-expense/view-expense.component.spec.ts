import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpenseComponent } from './view-expense.component';

describe('ViewExpenseComponent', () => {
  let component: ViewExpenseComponent;
  let fixture: ComponentFixture<ViewExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
