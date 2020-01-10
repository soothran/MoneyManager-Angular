import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { AuthService } from '../../shared/services/auth.service';
import { IncomeService } from '../../shared/services/income.service';
import { Income } from '../../shared/models/income.model';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {

  incForm: FormGroup;
  categories: Category[];
  incImg: File;
  imgInput: string;
  constructor(private authService: AuthService, private incService: IncomeService) {
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
  }

  addIncome() {
    if (this.incForm.valid) {
      const data: Income = this.incForm.value;
      data.userId = this.authService.getUserId();
      // data.image = this.incImg;
      const sampleFile = new Blob();
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      if (this.incImg && this.incImg.name !== '') {
        formData.append('file', this.incImg, this.incImg.name);
      } else {
        formData.append('file', sampleFile);
      }

      this.incService.addIncome(formData).subscribe(
        (res) => {
          if (res) {
            alert('Successfully added');
            this.incForm.reset();
            this.imgInput = '';
          }
        }, (err) => {

        });
    }
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.incImg = fileList[0];
    }
  }

}
