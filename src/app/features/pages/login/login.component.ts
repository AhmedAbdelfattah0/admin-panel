import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AppConstant } from 'src/app/shared/constants/app.conestant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup = new FormGroup({
  username: new FormControl(''),
  password: new FormControl(''),
})
  constructor(
    private authService:AuthService
  ) {

  }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.loginForm.value);
  }
}
