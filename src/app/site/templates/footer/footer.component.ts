import { Component } from '@angular/core';
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(
    public utilsService: UtilsService,
  ) {}

}
