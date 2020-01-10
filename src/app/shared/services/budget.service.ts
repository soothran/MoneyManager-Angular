import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  BUD_API_URL = 'http://localhost:8080/moneymanager/budget';

  constructor(private httpClient: HttpClient) { }

  addBudget(formData): Observable<any> {
    return this.httpClient.post<any>(this.BUD_API_URL + '/add', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  getBudget(formData): Observable<any> {
    return this.httpClient.post<any>(this.BUD_API_URL + '/get', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }
}
