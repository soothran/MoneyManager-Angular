import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, OnChanges } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  isLoggedIn$: Observable<boolean>;
  loggedInUser$: Observable<string>;
  username: string;
  constructor(private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.getAuthStatus();
    this.loggedInUser$ = this.authService.getUserName();
    this.authService.getUserName().subscribe((res) => {
      this.username = res;
      this.changeDetectorRef.detectChanges();
    });
    console.log(this.loggedInUser$);
  }

  ngOnChanges() {
    this.authService.getUserName().subscribe((res) => {
      this.username = res;
      this.changeDetectorRef.detectChanges();
    });
  }


  logout() {
    this.authService.logoutUser().subscribe(res => {
      if (!res) {
        this.router.navigate(['login']);
      }
    },
      (error) => {
        console.log(error);
        this.router.navigate(['login']);
      });
  }
}
