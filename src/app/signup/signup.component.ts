import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../shared/services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  regForm: FormGroup;

  constructor(private signupService: SignupService, private route: Router) { }

  ngOnInit() {
    this.regForm = new FormGroup({
      userName: new FormControl('', [Validators.minLength(3), Validators.required]),
      email: new FormControl('', [Validators.minLength(6), Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      contactNumber: new FormControl('', {
        validators: [Validators.minLength(10),
        Validators.maxLength(10), Validators.pattern('[6-9]\\d{9}'), Validators.required], updateOn: 'blur'
      }),
      confirmPassword: new FormControl('', { validators: [Validators.minLength(6), Validators.required], updateOn: 'blur' }),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    });
  }

  doRegister() {
    if (this.regForm.valid) {
      const data = {
        userName: this.regForm.controls['userName'].value,
        emailId: this.regForm.controls['email'].value,
        contactNumber: this.regForm.controls['contactNumber'].value,
        password: this.regForm.controls['password'].value
      };

      this.signupService.registerUser(data).subscribe((res) => {
        alert('successfully registered');
        this.navToLogin();
      }, (err) => {
        alert('Failed' + err);
      });
    } else {
      alert('Invalid form');
    }
  }

  navToLogin() {
    this.route.navigate(['login']);
  }

  resetForm() {
    this.regForm.reset();
  }

}
