import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Split } from '../models/split.model';
import { SplitDetail } from '../models/split-detail.model';
import { PersistenceService, StorageType } from 'angular-persistence';

@Injectable({
  providedIn: 'root'
})
export class SplitService {

  SPLIT_API_URL = 'http://localhost:8080/moneymanager/split';
  constructor(private httpClient: HttpClient,
    private persistenceService: PersistenceService) { }

  public splitWithFriend(formData: any): Observable<any> {
    const splitData = this.setSplitData(formData, false, '0');
    return this.httpClient.post<any>(this.SPLIT_API_URL + '/splitwithfriend', splitData).pipe(map(
      (res) => {
        this.persistenceService.remove('expenseToSplit', StorageType.SESSION);
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  public addGrpSplit(formData: any): Observable<any> {
    const splitData = this.setSplitData(formData, true, formData.groupId);
    return this.httpClient.post<any>(this.SPLIT_API_URL + '/splitwithgrp', splitData).pipe(map(
      (res) => {
        this.persistenceService.remove('expenseToSplit', StorageType.SESSION);
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  public getSplitDetailsOfFriends(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.SPLIT_API_URL + '/getsplitdetailsoffriends', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  public getFriendSplitHistory(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.SPLIT_API_URL + '/getfriendsplithistory', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  setSplitData(formData, isGroupExpense, groupId) {
    const splitData: Split = {
      expenseId: formData.expenseId,
      isGroupExpense: isGroupExpense,
      groupId: groupId,
      splitDetails: formData.splitDetails,
      total: formData.total
    };
    return splitData;
  }
}
