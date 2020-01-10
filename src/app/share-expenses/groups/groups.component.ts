import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups = [{ name: 'Office', debt: '1430.00', credit: '2351.00' },
  { name: 'Flat 12B', debt: '3790.00', credit: '2660.00' },
  { name: 'Conveyance', debt: '300.00', credit: '900.00' },
  { name: 'Lunch', debt: '560.00', credit: '870.00' }];

  constructor() { }

  ngOnInit() {
  }

}
