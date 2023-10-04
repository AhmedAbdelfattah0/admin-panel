import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './features/pages/products/products.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { LoginComponent } from './features/pages/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotAuthedGuard } from './shared/guards/not-authed.guard';

const routes: Routes = [
  {path:'products', component:ProductsComponent,canActivate:[AuthGuard]},
  {path:'categories', component:CategoriesComponent,canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent, canActivate:[NotAuthedGuard]},
  {path:'', redirectTo:'products', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
