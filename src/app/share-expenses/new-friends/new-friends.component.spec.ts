import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFriendsComponent } from './new-friends.component';

describe('NewFriendsComponent', () => {
  let component: NewFriendsComponent;
  let fixture: ComponentFixture<NewFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
