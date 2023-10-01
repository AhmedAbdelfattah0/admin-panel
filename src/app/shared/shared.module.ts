import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [

    SidebarComponent,
    NavbarComponent,

  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule

  ],
  exports:[
    CommonModule,
    NavbarComponent,
    SidebarComponent,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SharedModule { }
