import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  user = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUserProfile();
  }

}
