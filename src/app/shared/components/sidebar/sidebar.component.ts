import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/services/auth.service';
import { DatastoreService } from '../../services/datastore.service';
import { AppConstant } from '../../constants/app.conestant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userInfo:any
  constructor(
    private authService:AuthService,
    private datastoreService: DatastoreService


  ) {
   this.userInfo =  this.datastoreService.getItemFromLocalStorage(AppConstant.USER_INFO,true)

  }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logOut();
  }
}
