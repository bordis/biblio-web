import { Component } from '@angular/core';

// PrimeNG
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

const imporst = [
  ButtonModule,
  RippleModule,
  StyleClassModule,
  InputTextModule,
  InputTextareaModule
]

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: imporst,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
