import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../shared/services/signup.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginFailed = false;
  loginForm: FormGroup;
  constructor(private route: Router, private authService: AuthService) {
    if (this.authService.getAuthStatus()) {
      this.route.navigate(['home']);
    }

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.minLength(3), Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    });
  }

  navToSignup() {
    this.route.navigate(['signup']);
  }

  navToHome() {
    this.route.navigate(['home']);
  }

  doLogin() {
    if (this.loginForm.valid) {
      this.isLoginFailed = false;
      const data = {
        userName: this.loginForm.controls['userName'].value,
        password: this.loginForm.controls['password'].value
      };
      this.authService.authenticateUser(data).subscribe((res) => {
        if (res) {
          this.navToHome();
        } else {
          this.isLoginFailed = true;
        }
      }, (err) => {
        this.isLoginFailed = true;
      });
    } else {
      alert('Invalid form');
    }
  }

  getLoginErrorMessage() {
    return 'Invalid username or password';
  }
}
