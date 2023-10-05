import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AppConstant } from 'src/app/shared/constants/app.conestant';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  errorMessage: string = '';
  constructor(private authService: AuthService) {
    super();
    this.authService.loginErrorEmitter
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        if (res) {
          this.errorMessage = res?.error;
        }
      });
  }

  ngOnInit(): void {}

  login() {
    this.authService.login(this.loginForm.value);
  }
}
