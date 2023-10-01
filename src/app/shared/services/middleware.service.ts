import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MiddlewareService {
  getProducts: { url: string; headers: string[] };
  constructor() {
    this.buildUrls();
  }

  buildUrls(){
    this.getProducts={
      url: `${environment.baseUrl}/products`,
      headers:[]
    }
  }
}
