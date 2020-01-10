import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  EXP_API_URL = 'http://localhost:8080/moneymanager/expense';
  COMM_API_URL = 'http://localhost:8080/moneymanager/community';
  constructor(private authService: AuthService,
    private httpClient: HttpClient) { }


  public searchFriend(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.COMM_API_URL + '/searchfriend', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  public addFriend(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.COMM_API_URL + '/addfriend', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  public getFriends(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.COMM_API_URL + '/getfriends', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  public addGroup(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.COMM_API_URL + '/addgroup', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  public getGroups(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.COMM_API_URL + '/getgroups', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }
  public getGrpDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.COMM_API_URL + '/getgrpdetails', formData).pipe(map(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    ));
  }
}
