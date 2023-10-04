import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './features/pages/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateProductComponent } from './features/components/create-product/create-product.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { CategoryDetailsComponent } from './features/components/category-details/category-details.component';
import { CreateCategoryComponent } from './features/components/create-category/create-category.component';
import { LoginComponent } from './features/pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SidebarComponent,
    CreateProductComponent,
    CategoriesComponent,
    CategoryDetailsComponent,
    CreateCategoryComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
