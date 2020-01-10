import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareExpensesComponent } from './share-expenses.component';

describe('ShareExpensesComponent', () => {
  let component: ShareExpensesComponent;
  let fixture: ComponentFixture<ShareExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
