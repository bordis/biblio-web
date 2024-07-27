import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Amplify from 'aws-amplify';
import {
  autoSignIn,
  confirmSignUp,
  signUp,
  signIn,
  signOut,
  getCurrentUser
} from 'aws-amplify/auth';

// import { environment } from '../environments/environment';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;

  Tokentest: string = '';

  constructor() {
    // Amplify.configure({
    //   Auth: environment.cognito,
    // });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return signUp({
      username: user.email,
      password: user.password,
    });
  }

  // public confirmSignUp(user: IUser): Promise<any> {
  //   return confirmSignUp(user.email, user.code);
  // }

  // public signIn(user: IUser): Promise<any> {
  //   return signIn(user.email, user.password).then((user) => {
  //     this.authenticationSubject.next(true);
  //     let Token = user.getSignInUserSession().getAccessToken().getJwtToken();
  //     console.log(Token);
  //     this.Tokentest = Token;
  //   });
  // }

  // public signOut(): Promise<any> {
  //   return Auth.signOut().then(() => {
  //     this.authenticationSubject.next(false);
  //   });
  // }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return getCurrentUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        })
        .catch(() => {
          return false;
        });
    }
  }

  // public getUser(): Promise<any> {
  //   return currentUserInfo();
  // }

  public getSession(): Promise<any> {
    return getCurrentUser().then((user: any) => {
      return user.getSignInUserSession();
    });
  }



  // public updateUser(user: IUser): Promise<any> {
  //   return currentUserPoolUser().then((cognitoUser: any) => {
  //     return updateUserAttributes(cognitoUser, user);
  //   });
  // }

}
