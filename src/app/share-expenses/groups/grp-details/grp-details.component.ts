import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { CommunityService } from '../../../shared/services/community.service';
import { SplitService } from '../../../shared/services/split.service';
import { Router } from '@angular/router';
import { Group } from '../../../shared/models/group.model';

@Component({
  selector: 'app-grp-details',
  templateUrl: './grp-details.component.html',
  styleUrls: ['./grp-details.component.scss']
})
export class GrpDetailsComponent implements OnInit {

  groups: Group[];
  userId = '0';
  friendsSplitData = [];
  constructor(private authService: AuthService,
    private communityService: CommunityService,
    private splitService: SplitService,
    private route: Router) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    const data = {
      userId: this.userId
    };
    this.communityService.getGroups(data).subscribe(
      (res) => {
        this.groups = res;
      },
      (err) => { console.log(err); });
    // if (data.userId !== '0') {
    //   this.splitService.getSplitDetailsOfFriends(data).subscribe(
    //     (res) => {
    //       this.friendsSplitData = res;
    //     },
    //     (err) => { console.log(err); });
    // }
  }



//   totalGrpDebt(id) {
// const total = 0;
// this.friendsSplitData.map((v) =>{
// if(v.)
// });
//   }
  newGrpSplit() {
    this.route.navigate(['/share/groups/add']);
  }
}
