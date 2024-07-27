import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SecuredService {

  constructor(
    private http: HttpClient
  ) { }

  getNewsletter(): Observable<any> {
    return this.http.get<any>(`${apiUrl}api/newletter`);
  }
}
