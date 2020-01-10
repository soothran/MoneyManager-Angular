import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { CommunityService } from '../../shared/services/community.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {

  newGrpForm: FormGroup;
  friends: User[];
  selectedFriends: User[] = [];
  constructor(private authService: AuthService,
    private communityService: CommunityService) {
    this.newGrpForm = new FormGroup({
      title: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    const data = {
      userId: this.authService.getUserId()
    };
    if (data.userId !== '0') {
      this.communityService.getFriends(data).subscribe(
        (res) => {
          this.friends = res;
        },
        (err) => { console.log(err); });
    }
  }

  addGroup() {
    const userId = this.authService.getUserId();
    if (this.newGrpForm.valid && userId !== '0') {
      if (this.selectedFriends.length > 0) {
        const data = this.newGrpForm.value;
        data.userId = userId;
        data.user = this.selectedFriends;
        this.communityService.addGroup(data).subscribe(
          (res) => {
            alert('added');
          }, (err) => {

          });
      } else {
        alert('add atleast a friend to create group');
      }
    }
  }

  addToGrp(userId: string) {
    if (userId) {
      const newMemeber = { userId: +userId };
      this.selectedFriends.push(newMemeber);
    }
  }
  removeMember(userId: string) {
    if (userId && this.selectedFriends) {
      const index = this.selectedFriends.findIndex(friend => friend.userId === +userId);
      this.selectedFriends.splice(index, 1);
    }
  }

  isMemeberAdded(userId: string): boolean {
    if (userId && this.selectedFriends) {
      const index = this.selectedFriends.findIndex(friend => friend.userId === (+userId));
      return index === -1 ? false : true;
    }
  }
}
