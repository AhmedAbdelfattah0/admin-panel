import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  constructor() {}

  setInLocalStorage(key: string, value: any, isJsonData: boolean) {
    try {
      if (isJsonData) {
        value = JSON.stringify(value);
      }
      return localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  }

  getItemFromLocalStorage(key: string, isJsonData: boolean) {
    let data = localStorage.getItem(key);
    return isJsonData ? JSON.parse(<any>data) : data;
  }
}
