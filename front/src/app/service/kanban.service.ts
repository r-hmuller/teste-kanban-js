import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ListCard} from "../model/listCard.model";
import{Card} from "../model/card.model";
import {Observable} from "rxjs";
import {Login} from "../model/login.model";

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  jwtToken: string = "";
  kanbanUrl: string = import.meta.env['NG_APP_API_URL'];
  constructor(private http: HttpClient) {
    const login: string = import.meta.env['NG_APP_API_USERNAME'];
    const password: string = import.meta.env['NG_APP_API_PASSWORD']
    this.http.post<Login>(this.kanbanUrl + "/login", {"login": login, "password": password}).subscribe((login) => {
      this.jwtToken = login.jwtToken;
    });
  }


  getCards(): Observable<ListCard>  {
    return this.http.get<ListCard>(this.kanbanUrl + "/cards", {headers: {"Authorization": "Bearer " + this.jwtToken}});
  }

  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.kanbanUrl + "/cards", card, {headers: {"Authorization": "Bearer " + this.jwtToken}});
  }

  updateCard(card: Card): Observable<Card> {
    return this.http.put<Card>(this.kanbanUrl + "/cards/" + card.id, card, {headers: {"Authorization": "Bearer " + this.jwtToken}});
  }

  deleteCard(card: Card): Observable<any> {
    return this.http.delete(this.kanbanUrl + "/cards/" + card.id, {headers: {"Authorization": "Bearer " + this.jwtToken}});
  }
}
