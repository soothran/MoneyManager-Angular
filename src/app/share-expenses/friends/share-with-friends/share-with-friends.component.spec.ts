import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareWithFriendComponent } from './share-with-friends.component';

describe('AddExpenseComponent', () => {
  let component: ShareWithFriendComponent;
  let fixture: ComponentFixture<ShareWithFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareWithFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareWithFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
