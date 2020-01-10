import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { CommunityService } from '../../../shared/services/community.service';
import { Router } from '@angular/router';
import { SplitService } from '../../../shared/services/split.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {

  // friends = [{ name: 'Saji', debt: '340.00', credit: '' },
  // { name: 'Ashok', debt: '', credit: '760.00' },
  // { name: 'Akash', debt: '200.00', credit: '' },
  // { name: 'Vinod', debt: '', credit: '4500.00' },
  // { name: 'Neethu', debt: '3400.00', credit: '' },
  // { name: 'Johns', debt: '12000.00', credit: '' },
  // { name: 'Syam', debt: '', credit: '870.00' }];

  friendsSplitData = [];
  friendSplitHistory = [];
  isDetailViewOn = false;
  isUserOwesMoney: boolean;
  statusTxt: string;
  total = 0;
  constructor(private authService: AuthService,
    private communityService: CommunityService,
    private datePipe: DatePipe,
    private splitService: SplitService,
    private route: Router) { }

  ngOnInit() {
    this.statusTxt = 'You are owed';
    this.isUserOwesMoney = false;
    const data = {
      userId: this.authService.getUserId()
    };
    if (data.userId !== '0') {
      this.splitService.getSplitDetailsOfFriends(data).subscribe(
        (res) => {
          this.friendsSplitData = res;
          this.getTotalBalanceAmt();
        },
        (err) => { console.log(err); });
    }
  }

  getFriendSplitHistory(id) {

    const formData = new FormData();
    formData.append('userId', this.authService.getUserId());
    formData.append('friendId', id);
    this.splitService.getFriendSplitHistory(formData).subscribe(
      (res) => {
        this.friendSplitHistory = res;
        this.isDetailViewOn = true;
      },
      (err) => { console.log(err); });
  }

  getTotalBalanceAmt() {
    this.total = 0;
    let debtTotal = 0, creditTotal = 0;
    this.friendsSplitData.map(
      (v, i) => {
        debtTotal += (+v.debt);
        creditTotal += (+v.credit);
      }
    );
    if (creditTotal > debtTotal) {
      this.isUserOwesMoney = true;
      this.statusTxt = 'You are owed';
      this.total = Math.round((creditTotal - debtTotal) * 100) / 100;
    } else {
      this.statusTxt = 'You owe';
      this.total = Math.round((debtTotal - creditTotal) * 100) / 100;
    }
    // return this.total;
  }

  hasPaid(item) {
    if (item.debterId !== this.authService.getUserId()) {
      return item.totalAmt;
    }
    return '0';
  }

  userOwes(item) {
    if (item.oweTo !== this.authService.getUserId()) {
      return item.owe;
    }
    return '';
  }

  userGets(item) {
    if (item.oweTo === this.authService.getUserId()) {
      return item.owe;
    }
    return '';
  }

  newFriendSplit() {
    this.route.navigate(['/share/friends/add']);
  }
  formatDate(dt): string {
    return this.datePipe.transform(dt, 'dd-MM-yyyy');
  }

  moreDetails(id) {

  }

  backToDetails() {
    this.isDetailViewOn = false;
    this.friendSplitHistory = [];
  }
}

