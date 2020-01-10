import { Component, OnInit } from '@angular/core';
import { Income } from '../../shared/models/income.model';
import { AuthService } from '../../shared/services/auth.service';
import { IncomeService } from '../../shared/services/income.service';
import { DatePipe } from '@angular/common';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-income',
  templateUrl: './view-income.component.html',
  styleUrls: ['./view-income.component.scss']
})
export class ViewIncomeComponent implements OnInit {

  shareIncId: string;
  allInc: Income[] = [];
  constructor(private authService: AuthService,
    private incService: IncomeService,
    private datePipe: DatePipe,
    private persistenceService: PersistenceService,
    private route: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getIncomes();
  }

  getIncomes() {
    const formData = { userId: '0' };
    formData.userId = this.authService.getUserId();
    if (formData.userId !== '0') {
      this.incService.getAllIncomes(formData).subscribe((res) => {
        this.allInc = res;
      },
        (err) => {

        });
    }
  }

  updateIncome(item: Income) {
    const isStored = this.persistenceService.set('incomeToUpdate', item, { type: StorageType.SESSION });
    if (isStored) {
      this.route.navigate(['income/update']);
    }

  }

  shareIncome(content, incomeToShare) {
    this.shareIncId = incomeToShare;
    this.modalService.open(content, { size: 'sm' });
  }

  goToFriendShare() {
    this.modalService.dismissAll();
    const isStored = this.persistenceService.set('incomeToSplit', this.shareIncId, { type: StorageType.SESSION });
    if (isStored) {
      this.route.navigate(['/share/friends/add']);
    }
  }
  goToGroupShare() {
    this.modalService.dismissAll();
    const isStored = this.persistenceService.set('incomeToSplit', this.shareIncId, { type: StorageType.SESSION });
    if (isStored) {
      this.route.navigate(['/share/groups/add']);
    }
  }
  formatDate(dt): string {
    return this.datePipe.transform(dt, 'dd-MM-yyyy');
  }
}
