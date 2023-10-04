import { AuthService } from './features/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin-panel';
  isLoggedIn:boolean=false
  constructor( private authService:AuthService){
    this.authService.isLoggedIn()
    this.authService.isLoggedInEmiter.subscribe((res)=>{
      this.isLoggedIn =res
    })
  }
}
