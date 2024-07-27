
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap } from 'rxjs';
import Amplify from 'aws-amplify';
import { IUser, CognitoService } from './cognito.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInteceptorService implements HttpInterceptor {
  constructor(private readonly _cognitoService: CognitoService) { }

  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //
    return from(this._cognitoService.getSession()).pipe(
      switchMap((session) => {
        console.log('session', session);
        let jwttoken = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + session.accessToken.jwtToken,
          },
        });
        return next.handle(jwttoken);
      })
    );
  }
}