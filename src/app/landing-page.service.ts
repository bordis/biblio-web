import { Injectable } from '@angular/core';

// environment
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Newsletter } from './models/newsletter';
import { Observable } from 'rxjs';
import { Contato } from './models/contato';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  constructor(
    private http: HttpClient
  ) { }

  cadastrarNewsletter(newsletter: Newsletter, captchaToken: string): Observable<any> {
    const params = new HttpParams().set('token', captchaToken);
    return this.http.post<any>(`${apiUrl}public/newsletter`,  newsletter, {params} );
  }
  enviarFormContact(contato: Contato, captchaToken: string): Observable<any> {
    const params = new HttpParams().set('token', captchaToken);
    return this.http.post(`${apiUrl}public/contato`, contato, { params });
  }
}
