import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { PersistenceService, StorageType } from 'angular-persistence';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  EXP_API_URL = 'http://localhost:8080/moneymanager/expense';
  CAT_API_URL = 'http://localhost:8080/moneymanager/category';

  constructor(private authService: AuthService,
    private httpClient: HttpClient,
    private persistenceService: PersistenceService) { }


  public getAllExpenses(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.EXP_API_URL + '/getallexpenses', formData).pipe(map(
      (res) => {
        // this.filterThisMonthExp(res);
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  public getCurrMonthExpenses(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.EXP_API_URL + '/getallexpenses', formData).pipe(map(
      (res) => {
        if (res && res.length !== undefined && res.length > 0) {
          return res;
        }
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  filterThisMonthExp(data: Expense[]) {
    return data.filter((v) => {
      const dt = new Date();
      const fDay = new Date(dt.getFullYear(), dt.getMonth(), 1);
      const exDt = new Date(v.expenseTime);
      if (exDt >= fDay) {
        return v;
      }
    });
  }

  filterLastMonthExp(data: Expense[]) {
    return data.filter((v) => {
      const dt = new Date();
      const fDay = new Date(dt.getFullYear(), dt.getMonth() - 1, 1);
      const lDay = new Date(dt.getFullYear(), dt.getMonth(), 0);
      const exDt = new Date(v.expenseTime);
      if (exDt >= fDay && exDt < lDay) {
        return v;
      }
    });
  }

  public addExpense(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.EXP_API_URL + '/add', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  public deleteExpense(formData: Expense): Observable<any> {
    return this.httpClient.post<any>(this.EXP_API_URL + '/delete', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }


  public updateExpense(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.EXP_API_URL + '/update', formData).pipe(map(
      (res) => {
        this.persistenceService.remove('expenseToUpdate', StorageType.SESSION);
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }
  public getCategories(): Observable<Category[]> {
    const formData = {
      userId: this.authService.getUserId(),
      categoryType: 'expense'
    };
    return this.httpClient.post<any>(this.CAT_API_URL + '/getcategories', formData).pipe(map(
      (res) => {
        res.filter((v) => v.categoryType === 'expense');
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}

