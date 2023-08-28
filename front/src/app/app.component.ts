import { Component } from '@angular/core';
import {Card} from "./model/card.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  newCard: Card = {
    titulo: '',
    conteudo: '',
    lista: ''
  }

  cards: Card[] = [];
}
