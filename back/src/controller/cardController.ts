import {Result, ValidationError, validationResult} from "express-validator";
import {CardDTO} from "../dto/cardDTO";
import {CardService} from "../service/card";
import { Request, Response, NextFunction } from 'express';

export class CardController {
    cardService: CardService;
    constructor() {
        this.cardService = new CardService();
    }
    listCards(_req: Request, res: Response, next: NextFunction): void {
        this.cardService.getAllCards().then((cards: Map<string, CardDTO[]>) => {
            res.json(Object.fromEntries(cards));
        });
    }

    createCard(req: Request, res: Response, next: NextFunction): void {
        const errors: Result<ValidationError> = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array({onlyFirstError: true}) });
            return;
        }
        let cardDTO: CardDTO = {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            lista: req.body.lista,
        }

        this.cardService.saveCard(cardDTO).then((responseDTO: CardDTO) => {
            cardDTO = responseDTO;
            res.status(201).send(cardDTO);
        });
    }
    getCard(req: Request, res: Response, next: NextFunction): Response {
        return res.send("getCard");
    }

   updateCard(req: Request, res: Response, next: NextFunction): Response {
        return res.send("updateCard");
   }

   deleteCard(req: Request, res: Response, next: NextFunction): Response {
        return res.send("deleteCard");
   }
}
