import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Income } from '../models/income.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  INC_API_URL = 'http://localhost:8080/moneymanager/income';
  CAT_API_URL = 'http://localhost:8080/moneymanager/category';

  constructor(private authService: AuthService,
    private httpClient: HttpClient,
    private persistenceService: PersistenceService) { }


  public getAllIncomes(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.INC_API_URL + '/getallincomes', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  public getCurrMonthIncomes(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.INC_API_URL + '/getallincomes', formData).pipe(map(
      (res) => {
        if (res && res.length !== undefined && res.length > 0) {
          return this.filterThisMonthInc(res);
        }
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  filterThisMonthInc(data: Income[]) {
    return data.filter((v) => {
      const dt = new Date();
      const fDay = new Date(dt.getFullYear(), dt.getMonth(), 1);
      const inDt = new Date(v.incomeTime);
      if (inDt >= fDay) {
        return v;
      }
    });
  }

  public addIncome(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.INC_API_URL + '/add', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  public deleteIncome(formData: Income): Observable<any> {
    return this.httpClient.post<any>(this.INC_API_URL + '/delete', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }


  public updateIncome(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.INC_API_URL + '/update', formData).pipe(map(
      (res) => {
        this.persistenceService.remove('incomeToUpdate', StorageType.SESSION);
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
      categoryType: 'income'
    };
    return this.httpClient.post<any>(this.CAT_API_URL + '/getcategories', formData).pipe(map(
      (res) => {
        res.filter((v) => v.categoryType === 'income');
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
