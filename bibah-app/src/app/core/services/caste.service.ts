import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasteService {
  private apiUrl = `http://localhost:3000/api`;

  constructor(private http: HttpClient) { }

  addCaste(body: string):Observable<any> {
    console.log(body);
    return this.http.post<any>(`${this.apiUrl}/caste/add`, body);
  }

  getCastes():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/caste/list`);
  }

  deleteCaste(data: any):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/caste/delete`, { body: data });
  }
}
