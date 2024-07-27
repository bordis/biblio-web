import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public openLinkBlank(link: string) {
    window.open(link, '_blank');
  }
}
