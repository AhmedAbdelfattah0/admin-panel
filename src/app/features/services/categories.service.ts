import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MiddlewareService } from 'src/app/shared/services/middleware.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  constructor( private httpClient:HttpClient, private middlewareService: MiddlewareService ) {
  }

  getCategoriesList() {
    return  this.httpClient.get<String[]>(this.middlewareService.getCategories.url)
  }
}
