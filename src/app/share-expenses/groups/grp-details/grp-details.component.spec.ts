import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpDetailsComponent } from './grp-details.component';

describe('GrpDetailsComponent', () => {
  let component: GrpDetailsComponent;
  let fixture: ComponentFixture<GrpDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrpDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
