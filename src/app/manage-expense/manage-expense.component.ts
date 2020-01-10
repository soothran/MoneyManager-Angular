import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-expense',
  templateUrl: './manage-expense.component.html',
  styleUrls: ['./manage-expense.component.scss']
})
export class ManageExpenseComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  expenseInernalNav(link: string) {
    this.route.navigate(['/expense/' + link]);
  }
  getRoute(): string {
    return this.route.url;
  }
}
