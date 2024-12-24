import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private apiUrl = `http://localhost:3000/api`;

  constructor(private http: HttpClient) { }

  addLanguage(body: string):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/language/add`, body);
  }

  updateLanguage(id: string, body: string ):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/language/update/${id}`, body);
  }

  deleteLanguage(id: string):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/language/delete/${id}`);
  }

  getLanguages():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/language/list`);
  }

  getLanguageById(id: string):Observable<any> {
    console.log(id);
    return this.http.get<any>(`${this.apiUrl}/language/${id}`);
  }
}
