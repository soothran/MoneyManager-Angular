import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIncomeComponent } from './manage-income.component';

describe('ManageIncomeComponent', () => {
  let component: ManageIncomeComponent;
  let fixture: ComponentFixture<ManageIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
