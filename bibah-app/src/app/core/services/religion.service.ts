import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReligionService {
  private apiUrl = `http://localhost:3000/api`;

  constructor(private http: HttpClient) { }

  addReligion(body: string):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/religion/add`, body);
  }

  updateReligion(id: string, body: string ):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/religion/update/${id}`, body);
  }

  deleteReligion(id: string):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/religion/delete/${id}`);
  }

  getReligions():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/religion/list`);
  }

  getReligionById(id: string):Observable<any> {
    console.log(id);
    return this.http.get<any>(`${this.apiUrl}/religion/${id}`);
  }
}
