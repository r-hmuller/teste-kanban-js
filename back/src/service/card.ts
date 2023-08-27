import {CardDTO} from "../dto/cardDTO";
import {v4 as uuidv4} from 'uuid';
import {CardModel} from "../entity/cardModel";


export class CardService {
    async saveCard(card: CardDTO): Promise<CardDTO> {
        const cardEntity = await CardModel.create({titulo: card.titulo, conteudo: card.conteudo, lista: card.lista});
        card.id = cardEntity.id;
        return card;
    }

    async getAllCards(): Promise<Map<string, CardDTO[]>> {
        const cards: Map<string, CardDTO[]> = new Map<string, CardDTO[]>();
        cards.set('TODO', []);
        cards.set('DOING', []);
        cards.set('DONE', []);

        const cardsModel = await CardModel.findAll();
        cardsModel.forEach((cardModel) => {
            const cardDTO: CardDTO = {
                id: cardModel.id,
                titulo: cardModel.titulo,
                conteudo: cardModel.conteudo,
                lista: cardModel.lista,
            }
            // @ts-ignore
            cards.get(cardModel.lista).push(cardDTO);
        });

        return cards;
    }
}
