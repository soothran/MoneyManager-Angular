import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommunityService } from '../../shared/services/community.service';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-new-friends',
  templateUrl: './new-friends.component.html',
  styleUrls: ['./new-friends.component.scss']
})
export class NewFriendsComponent implements OnInit {

  searchForm: FormGroup;
  friend: User;
  constructor(private communityService: CommunityService, private authService: AuthService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      emailId: new FormControl('', [Validators.required])
    });
  }

  search() {
    if (this.searchForm.valid) {
      const data = this.searchForm.value;
      this.communityService.searchFriend(data).subscribe(
        (res) => {
          this.friend = res;
        }, (err) => {

        });
    }
  }

  addFriend(friendId: number) {
    const userId = this.authService.getUserId();
    if (userId !== '0') {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('friendId', friendId.toString());
      this.communityService.addFriend(formData).subscribe(
        (res) => {
          alert('added');
        }, (err) => {

        });
    }
  }

}
