import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setLocalItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  setSessionItem(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getItem(key: string): any {
    let item = JSON.parse(localStorage.getItem(key)!);
    if (!item) {
      item = JSON.parse(sessionStorage.getItem(key)!);
    }
    return item;
  }

  removeItem(key: string): void {
    let item = localStorage.getItem(key);
    if (item) {
      localStorage.removeItem(key);
    } else {
      sessionStorage.removeItem(key);
    }
  }
}
