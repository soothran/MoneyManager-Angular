import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(): boolean {
    return this.getGuardState();
  }

  canActivateChild(): boolean {
    return this.getGuardState();
  }

  getGuardState(): boolean {
    this.authService.getAuthStatus().subscribe(res => {
      if (!res) {
        this.router.navigate(['login']);
      }
    },
      (error) => {
        console.log(error);
        this.router.navigate(['login']);
      });
    return true;
  }

}
