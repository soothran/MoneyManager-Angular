import { Component, OnInit } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Expense } from '../../shared/models/expense.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { AuthService } from '../../shared/services/auth.service';
import { ExpenseService } from '../../shared/services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-expense',
  templateUrl: './delete-expense.component.html',
  styleUrls: ['./delete-expense.component.scss']
})
export class DeleteExpenseComponent implements OnInit {

  expToUpdate: Expense;
  expForm: FormGroup;
  categories: Category[];
  expImg: File;
  imgInput: string;
  constructor(private persistenceService: PersistenceService,
    private authService: AuthService,
    private expService: ExpenseService,
    private route: Router) {

    this.expService.getCategories().subscribe(
      (res) => {
        if (res.length > 0) {
          this.categories = res;
        }
      }, (err) => {

      });
    this.expForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)]),
      categoryId: new FormControl('', [Validators.required]),
      notes: new FormControl('')
    });
  }

  ngOnInit() {
    this.expToUpdate = this.persistenceService.get('expenseToUpdate', StorageType.SESSION);
    if (this.expToUpdate !== undefined) {
      this.expForm.controls['title'].setValue(this.expToUpdate.title);
      this.expForm.controls['amount'].setValue(this.expToUpdate.amount);
      this.expForm.controls['categoryId'].setValue(this.expToUpdate.categoryId);
      this.expForm.controls['notes'].setValue(this.expToUpdate.notes);
    }
  }

  updateExpense() {
    if (this.expForm.valid) {
      const data: Expense = this.expForm.value;
      data.userId = this.authService.getUserId();
      data.expenseId = this.expToUpdate.expenseId;
      data.status = this.expToUpdate.status;
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('file', this.expImg, this.expImg.name);
      this.expService.updateExpense(formData).subscribe(
        (res) => {
          if (res) {
            alert('Successfully added');
            this.expForm.reset();
            this.imgInput = '';
            this.route.navigate(['expense/view']);
          }
        }, (err) => {

        });
    }
  }

  deleteExpense() {
    if (this.expToUpdate.expenseId !== null || this.expToUpdate.expenseId !== '') {
      this.expService.deleteExpense(this.expToUpdate).subscribe((res) => {
        if (res) {
          alert('successfully deleted');
          this.route.navigate(['expense/view']);
        }
      }, (err) => {

      });
    }
  }

  viewExpense() {
    this.route.navigate(['expense/view']);
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.expImg = fileList[0];
    }
  }

}
