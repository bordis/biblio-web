// Angular
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// PrimeNG
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LandingPageService } from '../landing-page.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Recaptcha
import { ReCaptchaV3Service, RecaptchaFormsModule, RecaptchaModule, RecaptchaV3Module } from 'ng-recaptcha';
import { Newsletter } from '../models/newsletter';
import { Contato } from '../models/contato';


const imports = [
  ButtonModule,
  RippleModule,
  StyleClassModule,
  InputTextModule,
  InputTextareaModule,
  FormsModule,
  ToastModule,
  RecaptchaModule,
  RecaptchaFormsModule,
  RecaptchaV3Module,
  CommonModule,
  ProgressSpinnerModule
]

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: imports,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  providers: [

  ]

})



export class LandingPageComponent {

  constructor(
    private messageService: MessageService,
    private landingPageService: LandingPageService,
    private recaptchaV3Service: ReCaptchaV3Service,
  ) { }

  emailNewsletter1: Newsletter = {
    email: ''
  }
  emailNewsletter2: Newsletter = {
    email: ''
  }

  // contato
  contato: Contato = {
    nome: '',
    email: '',
    instituicao: '',
    mensagem: ''
  }

  //recaptcha
  public log: string[] = [];

  // loadings
  loadingNewsletter1 = false;
  loadingNewsletter2 = false;
  loadingContato = false;

  cadastrarNewsletter(news: string) {
    if (news === 'hero') {
      if (this.validarEmail(this.emailNewsletter1.email!)) {
        this.loadingNewsletter1 = true;
        this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
          this.landingPageService.cadastrarNewsletter(this.emailNewsletter1, token).subscribe(
            () => {
              this.successToast('Email cadastrado', 'Email cadastrado com sucesso!');
              this.emailNewsletter1 = new Newsletter();
              this.loadingNewsletter1 = false;
            },
            () => {
              this.errorToast('Email não cadastrado', 'Erro ao cadastrar email, tente novamente por favor!');
              this.emailNewsletter1 = new Newsletter();
              this.loadingNewsletter1 = false;
            }
          );
        },
          () => {
            this.loadingNewsletter1 = false;
          }
        );
      }
    } else {
      if (this.validarEmail(this.emailNewsletter2.email!)) {
        this.loadingNewsletter2 = true;
        this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
          this.landingPageService.cadastrarNewsletter(this.emailNewsletter2, token).subscribe(
            () => {
              this.successToast('Email cadastrado', 'Email cadastrado com sucesso!');
              this.emailNewsletter2 = new Newsletter();
              this.loadingNewsletter2 = false;
            },
            () => {
              this.errorToast('Email não cadastrado', 'Erro ao cadastrar email, tente novamente por favor!');
              this.emailNewsletter2 = new Newsletter();
              this.loadingNewsletter2 = false;
            }
          );
        },
          () => {
            this.loadingNewsletter2 = false;
          }
        );
      }
    }
  }

  enviarFormContact() {
    // Validação de campos
    if (this.contato.nome === '' || this.contato.email === '' || this.contato.instituicao === '' || this.contato.mensagem === '') {
      this.errorToast('Formulário incompleto', 'Preencha todos os campos do formulário');
    } else {
      if (this.validarEmail(this.contato.email!)) {
        this.loadingContato = true;
        this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
          this.landingPageService.enviarFormContact(this.contato, token).subscribe(
            () => {
              this.successToast('Formulário enviado', 'Formulário enviado com sucesso!');
              this.contato = new Contato();
              this.loadingContato = false;
            },
            () => {
              this.errorToast('Formulário não enviado', 'Erro ao enviar formulário, tente novamente por favor!');
              this.contato = new Contato();
              this.loadingContato = false;
            }
          );
        },
          () => {
            this.loadingContato = false;
          }
        );
      };
    }
  }

  openLinkBlank(link: string) {
    window.open(link, '_blank');
  }


  // funcoes shared
  successToast(titulo: string, mensagem: string) {
    this.messageService.add({ severity: 'success', summary: titulo, detail: mensagem });
  }

  errorToast(titulo: string, mensagem: string) {
    this.messageService.add({ severity: 'error', summary: titulo, detail: mensagem });
  }

  validarEmail(email: string) {
    if (email === '') {
      this.errorToast('Email não cadastrado', 'Email não pode ser vazio');
      return false;
    } else {
      // Validação de email, regex possui @, . e ao menos 2 caracteres após o .
      const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
      if (!regex.test(email)) {
        this.errorToast('Email não cadastrado', 'Email não está no formato correto');
        return false;
      }
    }
    return true;
  }

}
