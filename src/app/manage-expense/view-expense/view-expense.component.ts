import { Component, OnInit } from '@angular/core';
import { Expense } from '../../shared/models/expense.model';
import { AuthService } from '../../shared/services/auth.service';
import { ExpenseService } from '../../shared/services/expense.service';
import { DatePipe } from '@angular/common';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.scss']
})
export class ViewExpenseComponent implements OnInit {

  // expenses = [{ date: '01/01/2019', category: 'Food', title: 'Chicking', amount: '340.00', notes: 'After work' },
  // { date: '01/01/2019', category: 'Entertainment', title: 'Cinema', amount: '180.00', notes: 'With college friends' },
  // { date: '02/01/2019', category: 'Bills', title: 'Electricity', amount: '1567.00', notes: 'January bill' },
  // { date: '03/01/2019', category: 'Food', title: 'Hotel Alakapuri', amount: '120.00', notes: 'Meals' },
  // { date: '03/01/2019', category: 'Bills', title: 'Water', amount: '200.00', notes: 'December bill' },
  // { date: '03/01/2019', category: 'Grocery', title: 'Super market', amount: '960.00', notes: 'Necessary items and vegetables' },
  // { date: '04/01/2019', category: 'Entertainment', title: 'Football', amount: '150.00', notes: 'With office team' },
  // { date: '04/01/2019', category: 'Others', title: 'Birthday cake share', amount: '100.00', notes: 'Akash\'s Bday' },
  // { date: '04/01/2019', category: 'Food', title: 'Bakery', amount: '40.00', notes: 'Juice' },
  // { date: '05/01/2019', category: 'Investment', title: 'SIP', amount: '1500.00', notes: 'Mutual funds' },
  // { date: '08/01/2019', category: 'Food', title: 'Biriyani', amount: '120.00', notes: 'Office canteen' }];
  shareExpId: string;
  allExp: Expense[] = [];
  constructor(private authService: AuthService,
    private expService: ExpenseService,
    private datePipe: DatePipe,
    private persistenceService: PersistenceService,
    private route: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses() {
    const formData = { userId: '0' };
    formData.userId = this.authService.getUserId();
    if (formData.userId !== '0') {
      this.expService.getAllExpenses(formData).subscribe((res) => {
        this.allExp = res;
      },
        (err) => {

        });
    }
  }

  updateExpense(item: Expense) {
    const isStored = this.persistenceService.set('expenseToUpdate', item, { type: StorageType.SESSION });
    if (isStored) {
      this.route.navigate(['expense/update']);
    }

  }

  shareExpense(content, expenseToShare) {
    this.shareExpId = expenseToShare;
    this.modalService.open(content, { size: 'sm' });
  }

  goToFriendShare() {
    this.modalService.dismissAll();
    const isStored = this.persistenceService.set('expenseToSplit', this.shareExpId, { type: StorageType.SESSION });
    if (isStored) {
      this.route.navigate(['/share/friends/add']);
    }
  }
  goToGroupShare() {
    const isStored = this.persistenceService.set('expenseToSplit', this.shareExpId, { type: StorageType.SESSION });
    if (isStored) {
      this.route.navigate(['/share/groups/add']);
    }
  }
  formatDate(dt): string {
    return this.datePipe.transform(dt, 'dd-MM-yyyy');
  }
}
