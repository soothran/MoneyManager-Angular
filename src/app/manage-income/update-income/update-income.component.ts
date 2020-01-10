import { Component, OnInit } from '@angular/core';
import { Income } from '../../shared/models/income.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { PersistenceService, StorageType } from 'angular-persistence';
import { AuthService } from '../../shared/services/auth.service';
import { IncomeService } from '../../shared/services/income.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.scss']
})
export class UpdateIncomeComponent implements OnInit {

  incToUpdate: Income;
  incForm: FormGroup;
  categories: Category[];
  incImg: File;
  imgInput: string;
  constructor(private persistenceService: PersistenceService,
    private authService: AuthService,
    private incService: IncomeService,
    private route: Router) {
    this.incService.getCategories().subscribe(
      (res) => {
        if (res.length > 0) {
          this.categories = res;
        }
      }, (err) => {

      });
    this.incForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)]),
      categoryId: new FormControl('', [Validators.required]),
      notes: new FormControl('')
    });
  }

  ngOnInit() {
    this.incToUpdate = this.persistenceService.get('incomeToUpdate', StorageType.SESSION);
    if (this.incToUpdate !== undefined) {
      this.incForm.controls['title'].setValue(this.incToUpdate.title);
      this.incForm.controls['amount'].setValue(this.incToUpdate.amount);
      this.incForm.controls['categoryId'].setValue(this.incToUpdate.categoryId);
      this.incForm.controls['notes'].setValue(this.incToUpdate.notes);
    }
  }

  updateIncome() {
    if (this.incForm.valid) {
      const data: Income = this.incForm.value;
      data.userId = this.authService.getUserId();
      data.incomeId = this.incToUpdate.incomeId;
      data.status = this.incToUpdate.status;
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('file', this.incImg, this.incImg.name);
      this.incService.updateIncome(formData).subscribe(
        (res) => {
          if (res) {
            alert('Successfully added');
            this.incForm.reset();
            this.imgInput = '';
            this.route.navigate(['income/view']);
          }
        }, (err) => {

        });
    }
  }

  viewIncome() {
    this.route.navigate(['income/view']);
  }

  deleteIncome() {
    if (this.incToUpdate.incomeId !== null || this.incToUpdate.incomeId !== '') {
      this.incService.deleteIncome(this.incToUpdate).subscribe((res) => {
        if (res) {
          alert('successfully deleted');
          this.route.navigate(['income/view']);
        }
      }, (err) => {

      });
    }
  }
}
