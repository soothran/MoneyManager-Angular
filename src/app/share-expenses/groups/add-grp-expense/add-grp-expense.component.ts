import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../../shared/services/community.service';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/models/user.model';
import { Group } from '../../../shared/models/group.model';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Expense } from '../../../shared/models/expense.model';
import { SplitDetail } from '../../../shared/models/split-detail.model';
import { SplitService } from '../../../shared/services/split.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-grp-expense',
  templateUrl: './add-grp-expense.component.html',
  styleUrls: ['./add-grp-expense.component.scss']
})
export class AddGrpExpenseComponent implements OnInit {

  selectGrpForm: FormGroup;
  grpSplitForm: FormGroup;
  userId = '0';
  groupId = '0';
  expense: Expense;
  members: User[] = [];
  memberData: User[] = [];
  groups: Group[] = [];
  groupDetails: Group;
  constructor(private communityService: CommunityService,
    private authService: AuthService, private formBuilder: FormBuilder,
    private persistenceService: PersistenceService,
    private splitService: SplitService,
    private route: Router) {
    this.selectGrpForm = new FormGroup({
      groupId: new FormControl('', [Validators.required])
    });
    this.grpSplitForm = this.formBuilder.group({
      members: new FormArray([]),
      isChecked: new FormArray([])
    });
  }

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
    this.expense = this.persistenceService.get('expenseToSplit', StorageType.SESSION);
  }

  selectGrp(e) {
    this.groupId = this.selectGrpForm.controls['groupId'].value;
    const data = {
      groupId: this.groupId
    };
    this.communityService.getGrpDetails(data).subscribe(
      (res) => {
        this.groupDetails = res;
        this.members = this.groupDetails.user;
        this.memberData = this.members;
        this.clearFormArray((<FormArray>this.grpSplitForm.controls.members));
        this.clearFormArray((<FormArray>this.grpSplitForm.controls.isChecked));
        this.addCheckboxes();
      },
      (err) => { console.log(err); });
  }

  addCheckboxes() {
    const memberDefShare = this.getMemberEqShareValue(this.members.length);
    const fControls = this.members.map((o, i) => {
      // new FormControl(false)
      //  const control = new FormControl();
      (this.grpSplitForm.controls.members as FormArray).push(new FormControl(memberDefShare));
      (this.grpSplitForm.controls.isChecked as FormArray).push(new FormControl(true));
    });
    // this.grpSplitForm = this.formBuilder.group({
    //   members: new FormArray(fControls)
    // });
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  reCalcShare(idx) {
    this.updateMemberShare(idx, this.getSelectedUserIds().length);
    this.grpSplitForm.value.isChecked
      .map((v, i) => {
        if (!v) {
          (<FormArray>this.grpSplitForm.controls['members']).at(i).patchValue(0);
        }
      });
  }

  getMemberEqShareValue(shares) {
    return Math.round(((+this.expense.amount) / shares) * 100) / 100;
  }

  updateMemberShare(idx, len) {
    this.grpSplitForm.value.isChecked
      .map((v, i) => {
        if (len !== 0) {
          (<FormArray>this.grpSplitForm.controls['members']).at(i).patchValue(this.getMemberEqShareValue(len));
        }
      });
  }

  getSelectedUserIds() {
    return this.grpSplitForm.value.isChecked
      .map((v, i) => v ? this.members[i].userId : null)
      .filter(v => v !== null);

  }

  splitGrpExpense() {
    let splitTotal = 0;
    const selectedUserIds = this.getSelectedUserIds();
    console.log(selectedUserIds);
    const memberShare = this.grpSplitForm.value.members
      .map((v, i) => v ? v : null)
      .filter(v => v !== null);
    console.log(memberShare);

    memberShare.forEach((item, index) => {
      splitTotal += memberShare[index];
    });
    if (splitTotal === +this.expense.amount) {
      const splitData = {
        splitDetails: this.splitBtwMembers(selectedUserIds, memberShare),
        expenseId: this.expense.expenseId,
        total: this.expense.amount,
        groupId: this.groupDetails.groupId
      };

      this.splitService.addGrpSplit(splitData).subscribe(
        (res) => {
          alert('success');
        },
        (err) => { console.log(err); });
    } else {
      const grtVal = Math.max(splitTotal, +this.expense.amount);
      if (grtVal === splitTotal) {
        alert((Math.max(splitTotal, +this.expense.amount) - Math.min(splitTotal, +this.expense.amount)) + ' amount exceeded');
      } else {
        alert((Math.max(splitTotal, +this.expense.amount) - Math.min(splitTotal, +this.expense.amount)) + ' amount remains');
      }

    }
  }


  splitBtwMembers(selectedUserIds, memberShare) {
    const splitDetails: SplitDetail[] = [];
    const amIIncluded = selectedUserIds.findIndex((userId) => {
      return userId;
    });
    if (amIIncluded < 0) {
      const currUserShare: SplitDetail = {
        userId: this.authService.getUserId(),
        amount: '0'
      };
      splitDetails.push(currUserShare);
    }
    selectedUserIds.forEach((item, index) => {
      const userShare: SplitDetail = {
        userId: String(item),
        amount: String(memberShare[index])
      };

      splitDetails.push(userShare);
    });
    return splitDetails;
  }

  viewExpenses() {
    this.route.navigate(['/expense/view']);
  }
}
