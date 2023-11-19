import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://10.42.0.1:8000/run-motor'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  submitForm(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
