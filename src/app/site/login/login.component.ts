// angular
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// app modules
import { SiteModule } from '../site.module';
import { HeaderComponent } from '../templates/header/header.component';
import { FooterComponent } from "../templates/footer/footer.component";

//
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';


// amplify
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { PublicService } from '../public.service';
import { SecuredService } from '../secured.service';


const imports = [
  SiteModule,
  AmplifyAuthenticatorModule,
  StyleClassModule,
  RippleModule,
  RouterModule,
  HeaderComponent,
  FooterComponent,
  CommonModule,
]

@Component({
  selector: 'app-login',
  standalone: true,
  imports: imports,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(
    private publicService: PublicService,
    private secureService: SecuredService
  ) { }

  ngOnInit() {
    console.log('ngOnInit initialized');
    this.currentAuthenticatedUser();
    this.getPublic();
    this.getNewsletter();
  }

  ngOnChanges() {
    console.log('ngOnChanges initialized');
  }


  async currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails} = await getCurrentUser();        
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      console.log('User is authenticated');
      this.getToken();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getToken(){
    var cognitoTokens = (await fetchAuthSession()).tokens;

    let rawToken = cognitoTokens?.idToken?.toString();
    let payload = cognitoTokens?.idToken?.payload;

    console.log('rawToken', rawToken);
    console.log('payload', payload);
  }





  getPublic() {
    this.publicService.getPublic().subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getNewsletter() {
    this.secureService.getNewsletter().subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }




}
