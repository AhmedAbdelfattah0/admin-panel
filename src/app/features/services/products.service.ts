import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services/base.service';
import { MiddlewareService } from 'src/app/shared/services/middleware.service';
import { Products } from '../pages/products/products.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private httpClient:HttpClient, private middlewareService: MiddlewareService ) {
    }

  getProductsList() {
    return  this.httpClient.get<Products[]>(this.middlewareService.getProducts.url)
  }
}
