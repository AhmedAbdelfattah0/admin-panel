import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services/base.service';
import { MiddlewareService } from 'src/app/shared/services/middleware.service';
import { Product } from '../pages/products/products.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private httpClient:HttpClient, private middlewareService: MiddlewareService ) {
    }

  getProductsList() {
    return  this.httpClient.get<Product[]>(this.middlewareService.getProducts.url)
  }
  deleteProduct(productId:number) {
    return  this.httpClient.delete<Product>(`${this.middlewareService.deleteProduct.url}/${productId}`)
  }
  updateProduct(productData:Product) {
    return  this.httpClient.put<Product>(`${this.middlewareService.updateProduct.url}/${productData.id}`,productData)
  }


}
