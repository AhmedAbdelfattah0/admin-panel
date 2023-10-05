import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MiddlewareService } from 'src/app/shared/services/middleware.service';
import { Login } from '../pages/login/login.entity';
import { AppConstant } from 'src/app/shared/constants/app.conestant';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { DatastoreService } from 'src/app/shared/services/datastore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedInEmiter: BehaviorSubject<any> = new BehaviorSubject(false);
  loginErrorEmitter: BehaviorSubject<any> = new BehaviorSubject(null);
  decodedAccessToken: any = null;
  constructor(
    private httpClient: HttpClient,
    private middlewareService: MiddlewareService,
    private route: Router,
    private datastoreService: DatastoreService
  ) {}

  login(user: Login) {
    return this.httpClient
      .post(this.middlewareService.login.url, user)
      .subscribe({
        next: async (res: any) => {

          this.decodedAccessToken = this.getDecodedAccessToken(res['token']);
        await this.getAllUsers();
          this.datastoreService.setInLocalStorage(AppConstant.USER_TOKEN, res['token'],false);

          this.route.navigate(['/products']);
          this.isLoggedInEmiter.next(true);
        },
        error: (e) => this.loginErrorEmitter.next(e),
      });
  }

  isLoggedIn() {
    if (localStorage.getItem(AppConstant.USER_TOKEN)) {
      this.isLoggedInEmiter.next(true);
      return true;
    } else {
      this.isLoggedInEmiter.next(false);
      return false;
    }
  }

  logOut() {
    localStorage.clear();
    this.isLoggedInEmiter.next(false);

    this.route.navigate(['/login']);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

 async getAllUsers() {
    return this.httpClient
      .get(this.middlewareService.getAllUsers.url)
      .toPromise().then((res: any) => {
        let user = res.find(
          (user: any) => user.username == this.decodedAccessToken.user
        );
        this.datastoreService.setInLocalStorage(
          AppConstant.USER_INFO,
          user,
          true
        );
      });
  }
}
