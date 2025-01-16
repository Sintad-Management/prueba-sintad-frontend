import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/service/base.service';
import { User } from '../models/user.model';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService extends BaseService<User> {
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.authenticationURL;
  }

  signUp(user: User) {
    return this.http.post<{ token: string }>(this.buildPath() + '/sign-up', user, this.getHttpOptions())
      .pipe(
        catchError(this.handleError),
        tap(response => {
          if (response.token) {
            this.newToken(response.token);
          }
        })
      );
  }

  signIn(email: string, password: string): Observable<any> {
    const user = {
      "email": email,
      "password": password,
    };
    return this.http.post(this.buildPath() + '/sign-in', user, this.getHttpOptions())
      .pipe(catchError(this.handleError))
      .pipe(tap((response: any) => {
        this.newToken(response["token"]);
        localStorage.setItem('id', response["id"].toString());
        localStorage.setItem('user', JSON.stringify(user));
      }));
  }

}
