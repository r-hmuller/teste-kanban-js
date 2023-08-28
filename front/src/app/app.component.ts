import {Component, OnInit} from '@angular/core';
import {Card} from "./model/card.model";
import {KanbanService} from "./service/kanban.service";
import {ListCard} from "./model/listCard.model";
import {marked} from "marked";
import * as DOMPurify from "dompurify";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [KanbanService]
})
export class AppComponent implements OnInit {
  newCard: Card = {
    titulo: '',
    conteudo: '',
    lista: 'TODO'
  }

  updatingCard: Card = {
    titulo: '',
    conteudo: '',
    lista: '',
    id: 0
  }

  listCards: ListCard | undefined;
  constructor(private kanbanService: KanbanService) {
  }

  async ngOnInit() {
    await new Promise(r => setTimeout(r, 2000));
    this.kanbanService.getCards().subscribe((listCards) => {
      for (let listCardsKey in listCards) {
        // @ts-ignore
        for (let card of listCards[listCardsKey]) {
          card.conteudo = this.marked(DOMPurify.sanitize(card.conteudo));
        }
      }
      this.listCards = listCards;
    });
  }

  createNewCard() {
    this.kanbanService.createCard(this.newCard).subscribe((card) => {
      card.conteudo = this.marked(DOMPurify.sanitize(card.conteudo));
      this.listCards?.TODO.push(card);
      this.newCard = {
        titulo: '',
        conteudo: '',
        lista: 'TODO'
      }
    });
  }

  moveCard(card: Card, list: string) {
    let oldList = card.lista;
    card.lista = list;
    this.kanbanService.updateCard(card).subscribe((card) => {
      if (list === "DOING") {
        this.listCards?.DOING.push(card);
      } else if (list === "DONE") {
        this.listCards?.DONE.push(card);
      } else if (list === "TODO") {
        this.listCards?.TODO.push(card);
      }
      // @ts-ignore
      this.listCards![oldList] = this.listCards?.[oldList].filter((updatedCard: Card) => updatedCard.id !== card.id);
    });
  }

  updateCard(cardId: string, list: string) {
    this.updatingCard.id = parseInt(cardId);
    this.updatingCard.lista = list;
    this.kanbanService.updateCard(this.updatingCard).subscribe((card) => {
      if (list === "DOING") {
        this.listCards?.DOING.push(card);
      } else if (list === "DONE") {
        this.listCards?.DONE.push(card);
      } else if (list === "TODO") {
        this.listCards?.TODO.push(card);
      }

      // @ts-ignore
      this.listCards![oldList] = this.listCards?.[oldList].filter((updatedCard: Card) => updatedCard.id !== card.id);
    });
  }

  deleteCard(card: Card) {
    this.kanbanService.deleteCard(card).subscribe(() => {
      // @ts-ignore
      this.listCards![card.lista] = this.listCards?.[card.lista].filter((updatedCard: Card) => updatedCard.id !== card.id);
    });
  }

  editCard(card: Card) {

  }

  protected readonly marked = marked;
}
