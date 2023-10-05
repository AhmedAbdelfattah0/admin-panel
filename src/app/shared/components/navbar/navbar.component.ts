import { AppConstant } from '../../constants/app.conestant';
import { DatastoreService } from '../../services/datastore.service';
import { AuthService } from './../../../features/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private datastoreService: DatastoreService
  ) {}
  userInfo: any;
  ngOnInit(): void {
   this.userInfo =  this.datastoreService.getItemFromLocalStorage(AppConstant.USER_INFO,true)
  }

  logOut() {
    return this.authService.logOut();
  }
}
