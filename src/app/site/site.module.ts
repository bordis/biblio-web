import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amplify } from 'aws-amplify';
import { environment } from '../../environments/environment';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-angular';
I18n.putVocabularies(translations);
I18n.setLanguage('pt');


Amplify.configure({
  Auth: {
    Cognito: {
    userPoolId: environment.cognito.userPoolId,
    userPoolClientId: environment.cognito.userPoolWebClientId,
    }
  },
});


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ]
})
export class SiteModule { }
