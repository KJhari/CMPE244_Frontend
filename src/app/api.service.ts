import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://192.168.46.23:8000/run-motor';
  private gptapiUrl = 'http://192.168.46.23:8000/gpt-prompt';
  constructor(private http: HttpClient) { }

  submitForm(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getChatGptResponse(prompt: string) {
    return this.http.post(this.gptapiUrl, { prompt });
  }
}


