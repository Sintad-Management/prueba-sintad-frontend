import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, CanLoad, Router, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');
    return token ? true : this.router.createUrlTree(['/login']);
  }

  canActivateChild(): boolean | UrlTree {
    return this.canActivate();
  }
}
