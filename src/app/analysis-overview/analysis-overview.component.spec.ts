import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisOverviewComponent } from './analysis-overview.component';

describe('AnalysisOverviewComponent', () => {
  let component: AnalysisOverviewComponent;
  let fixture: ComponentFixture<AnalysisOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
