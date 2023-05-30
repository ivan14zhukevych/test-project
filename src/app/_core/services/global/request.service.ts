import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, body: any, headers?: any): Observable<T> {
    return this.http.post<T>(url, body, { headers: headers || null });
  }

  patch<T>(url: string, body: any, headers?: any): Observable<T> {
    return this.http.patch<T>(url, body, { headers: headers || null });
  }
  
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
