import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MiddlewareService {
  getProducts: { url: string; headers: string[] };
  deleteProduct: { url: string; headers: string[] };
  updateProduct: { url: string; headers: string[] };
  addProduct: { url: string; headers: string[] };
  getCategories: { url: string; headers: string[] };
  constructor() {
    this.buildUrls();
  }

  buildUrls(){
    this.getProducts={
      url: `${environment.baseUrl}/products`,
      headers:[]
    }
    this.addProduct={
      url: `${environment.baseUrl}/products`,
      headers:[]
    }
    this.deleteProduct={
      url: `${environment.baseUrl}/products`,
      headers:[]
    }
    this.updateProduct={
      url: `${environment.baseUrl}/products`,
      headers:[]
    }
    this.getCategories={
      url: `${environment.baseUrl}/products/categories`,
      headers:[]
    }
  }
}
