import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MiddlewareService } from 'src/app/shared/services/middleware.service';
import { Login } from '../pages/login/login.entity';
import { AppConstant } from 'src/app/shared/constants/app.conestant';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedInEmiter: BehaviorSubject<any> = new BehaviorSubject(false);
  constructor(
    private httpClient: HttpClient,
    private middlewareService: MiddlewareService,
    private route: Router
  ) {}

  login(user: Login) {
    return this.httpClient
      .post(this.middlewareService.login.url, user)
      .subscribe((res: any) => {
        localStorage.setItem(AppConstant.USER_TOKEN, res['token']);
        this.route.navigate(['/products']);
        this.isLoggedInEmiter.next(true);
      });
  }

  isLoggedIn() {
    if (localStorage.getItem(AppConstant.USER_TOKEN)) {
      this.isLoggedInEmiter.next(true);
      return true;
    } else {
      this.isLoggedInEmiter.next(false);

      this.route.navigate(['/login']);
      return false;
    }
  }
  logOut() {
    localStorage.clear();
    this.isLoggedInEmiter.next(false);

    this.route.navigate(['/login']);
  }
}
