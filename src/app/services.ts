import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  apiURL = 'https://api.api-ninjas.com/v1/nutrition?query=';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    'X-API-Key': 'i59KhzW4npSOwH7ZjuYV1A==JB279oyfpYzDdVWp',
  });

  fetchData(data: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}${data}`, {
      headers: this.headers,
    });
  }
}
