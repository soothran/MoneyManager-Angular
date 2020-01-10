import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../shared/services/expense.service';
import { AuthService } from '../shared/services/auth.service';
import { IncomeService } from '../shared/services/income.service';
import { Expense } from '../shared/models/expense.model';
import { BudgetService } from '../shared/services/budget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalExp: number;
  totalInc: number;
  pCent: number;
  budgetAmt: number;
  expenseData: Expense[] = [];
  isCaution: boolean;
  constructor(private expService: ExpenseService,
    private authService: AuthService,
    private incService: IncomeService,
    private budgetService: BudgetService) { }

  ngOnInit() {
    this.isCaution = true;
    this.totalExp = 0;
    this.totalInc = 0;
    this.pCent = 0;
    this.budgetAmt = 0;
    this.getExpenseTotal();
    this.getIncomeTotal();
    this.getBudget();
  }
  // ((pEarned/pPos) * 100).toFixed(3);
  getExpenseTotal() {
    const formData = { userId: '0' };
    formData.userId = this.authService.getUserId();
    if (formData.userId !== '0') {
      this.expService.getCurrMonthExpenses(formData).subscribe((res) => {
        this.expenseData = res;
        const allExp = this.expService.filterThisMonthExp(res);
        let totalAmt = 0;
        if (allExp && allExp.length && allExp.length > 0) {
          allExp.map((v) => {
            totalAmt += (+v.amount);
          });
        }
        this.totalExp = totalAmt;
      },
        (err) => {

        });
    }
  }
  getIncomeTotal() {
    const formData = { userId: '0' };
    formData.userId = this.authService.getUserId();
    if (formData.userId !== '0') {
      this.incService.getCurrMonthIncomes(formData).subscribe((res) => {
        const allInc = res;
        let totalAmt = 0;
        if (allInc && allInc.length && allInc.length > 0) {
          allInc.map((v) => {
            totalAmt += (+v.amount);
          });
        }
        this.totalInc = totalAmt;
      },
        (err) => {

        });
    }
  }

  calcPercent() {
    const lastMonthData = this.expService.filterLastMonthExp(this.expenseData);
    if (lastMonthData.length > 0) {
      let lastMonthTotal = 0;
      lastMonthData.map((v) => {
        lastMonthTotal += (+v.amount);
      });
      this.pCent = +((this.totalExp / lastMonthTotal) * 100).toFixed(3);
      if (this.pCent < 100) {
        this.isCaution = false;
        return 'Spends down by ' + this.pCent + '% this month!';
      }
      return 'Spends up by ' + this.pCent + '% this month!';
    }
    return 'No data available';
  }

  getBudget() {
    const formData = { userId: '0' };
    formData.userId = this.authService.getUserId();
    if (formData.userId !== '0') {
      this.budgetService.getBudget(formData).subscribe((res) => {
        const budget = res;
        if (res && res.amount) {
          this.budgetAmt = +res.amount;
        }
      },
        (err) => {

        });
    }
  }

  budgetTxt() {
    if (this.budgetAmt > this.totalExp) {
      return 'This month budget( ₹' + this.budgetAmt + ' ) is maintained';
    } else if (this.budgetAmt !== 0) {
      return 'This month budget( &#8377;' + this.budgetAmt + ' ) has exceeded';
    }
    return 'No active budget';
  }
}
