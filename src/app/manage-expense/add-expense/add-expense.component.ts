import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ExpenseService } from '../../shared/services/expense.service';
import { Category } from '../../shared/models/category.model';
import { Expense } from '../../shared/models/expense.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  expForm: FormGroup;
  categories: Category[];
  expImg: File;
  imgInput: string;
  constructor(private authService: AuthService, private expService: ExpenseService) {
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
  }

  addExpense() {
    if (this.expForm.valid) {
      const data: Expense = this.expForm.value;
      data.userId = this.authService.getUserId();
      // data.image = this.expImg;
      const sampleFile = new Blob();
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      if (this.expImg && this.expImg.name !== '') {
        formData.append('file', this.expImg, this.expImg.name);
      } else {
        formData.append('file', sampleFile);
      }

      this.expService.addExpense(formData).subscribe(
        (res) => {
          if (res) {
            alert('Successfully added');
            this.expForm.reset();
            this.imgInput = '';
          }
        }, (err) => {

        });
    }
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.expImg = fileList[0];
    }
  }
}
