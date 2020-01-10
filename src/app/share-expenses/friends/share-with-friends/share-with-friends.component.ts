import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Expense } from '../../../shared/models/expense.model';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CommunityService } from '../../../shared/services/community.service';
import { User } from '../../../shared/models/user.model';
import { Split } from '../../../shared/models/split.model';
import { SplitService } from '../../../shared/services/split.service';
import { SplitDetail } from '../../../shared/models/split-detail.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-expense',
  templateUrl: './share-with-friends.component.html',
  styleUrls: ['./share-with-friends.component.scss']
})
export class ShareWithFriendComponent implements OnInit {

  public radioGroupForm: FormGroup;
  splitForm: FormGroup;
  expense: Expense;
  userId: string;
  isEqShareOn = true;
  friends: User[] = [];
  constructor(private formBuilder: FormBuilder,
    private persistenceService: PersistenceService,
    private route: Router,
    private authService: AuthService,
    private communityService: CommunityService,
    private splitService: SplitService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.radioGroupForm = this.formBuilder.group({
      'equalShare': true
    });
    this.splitForm = new FormGroup({
      userId: new FormControl(''),
      friendId: new FormControl('', [Validators.required]),
      userShare: new FormControl({ value: '0', disabled: true }, [Validators.required]),
      friendShare: new FormControl({ value: '0', disabled: true }, [Validators.required])
    });
    this.userId = this.authService.getUserId();
    const data = {
      userId: this.userId
    };
    this.communityService.getFriends(data).subscribe(
      (res) => {
        this.friends = res;
      },
      (err) => { console.log(err); });

    this.expense = this.persistenceService.get('expenseToSplit', StorageType.SESSION);
    if (this.expense !== undefined) {
      this.equalShareOn();
    }
  }

  equalShareOn() {
    this.isEqShareOn = true;
    // if (this.radioGroupForm.value['equalShare']) {
    this.splitForm.get('userShare').disable();
    this.splitForm.get('friendShare').disable();
    // }
    if (+this.expense.amount > 0) {
      const shareAmt = ((+this.expense.amount) / 2);
      this.splitForm.controls['userShare'].setValue(shareAmt);
      this.splitForm.controls['friendShare'].setValue(shareAmt);
    }
  }

  equalShareOff() {
    this.isEqShareOn = false;
    this.splitForm.get('userShare').enable();
    this.splitForm.get('friendShare').enable();
  }

  splitExpense() {
    this.splitForm.controls['userId'].setValue(this.expense.userId);
    const splitDetails = this.getSplitDetails(this.splitForm.getRawValue());
    const splitData = {
      splitDetails: splitDetails,
      expenseId: this.expense.expenseId,
      total: this.expense.amount
    };
    const total: number = (+this.splitForm.controls['userShare'].value) + (+this.splitForm.controls['friendShare'].value);
    if (this.splitForm.valid && (total === +this.expense.amount)) {
      this.splitService.splitWithFriend(splitData).subscribe(
        (res) => {
          alert('success');
        },
        (err) => { console.log(err); });

      console.log('splitted');
    }
  }

  getSplitDetails(details: any): SplitDetail[] {
    const splitDetails: SplitDetail[] = [];
    const userShare: SplitDetail = {
      userId: this.splitForm.controls['userId'].value,
      amount: this.splitForm.controls['userShare'].value
    };
    const friendShare: SplitDetail = {
      userId: this.splitForm.controls['friendId'].value,
      amount: this.splitForm.controls['friendShare'].value
    };
    splitDetails.push(userShare);
    splitDetails.push(friendShare);
    return splitDetails;
  }

  formatDate(dt): string {
    return this.datePipe.transform(dt, 'dd-MM-yyyy');
  }

  viewExpenses() {
    this.route.navigate(['/expense/view']);
  }
}
