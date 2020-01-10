import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-expenses',
  templateUrl: './share-expenses.component.html',
  styleUrls: ['./share-expenses.component.scss']
})
export class ShareExpensesComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  shareExpensesInernalNav(link: string) {
    this.route.navigate(['/share/' + link]);
  }
  getRoute(url): boolean {
    return this.route.url.indexOf(url) > -1 ? true : false;
  }

}
