import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { AuthenticationApiService } from '../services/authentication-api.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (token) {
      return this.router.createUrlTree(['/entidades']);
    } else {
      return true;
    }
  }

  canActivateChild(): boolean | UrlTree {
    return this.canActivate();
  }
}
