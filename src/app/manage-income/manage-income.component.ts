import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-income',
  templateUrl: './manage-income.component.html',
  styleUrls: ['./manage-income.component.scss']
})
export class ManageIncomeComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  incomeInernalNav(link: string) {
    this.route.navigate(['/income/' + link]);
  }
  getRoute(): string {
    return this.route.url;
  }
}
