import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { BudgetService } from '../../shared/services/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss']
})
export class AddBudgetComponent implements OnInit {

  min = new Date();
  budgetForm: FormGroup;
  constructor(private authService: AuthService,
    private budgetService: BudgetService,
    private route: Router) {
    this.min.setMonth(new Date().getMonth() + 1);
    this.budgetForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)]),
      period: new FormControl(this.min, [Validators.required])
    });
  }

  ngOnInit() {
  }

  addBudget() {
    console.log(this.budgetForm.value);
    const data = this.budgetForm.value;
    data.userId = this.authService.getUserId();
    this.budgetService.addBudget(data).subscribe(
      (res) => {
        if (res) {
          alert('Successfully added');

        }
      }, (err) => {

      });
  }

}
