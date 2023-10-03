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
    return  this.httpClient.get<string[]>(this.middlewareService.getCategories.url)
  }


  deleteCategory(category: string) {
    return this.httpClient.delete<string>(
      `${this.middlewareService.deleteCategory.url}/${category}`
    );
  }
  updateCategory(category: string) {
    return this.httpClient.put<string>(
      `${this.middlewareService.updateCategory.url}/${category}`,
      category
    );
  }
  addCategory(category : string) {
    return this.httpClient.post<string>(
      this.middlewareService.addCategory.url,
      category
    );
  }
}
