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
    getCard(req: Request, res: Response, next: NextFunction): void {
        const errors: Result<ValidationError> = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array({onlyFirstError: true}) });
            return;
        }
        const id: number = parseInt(req.params.id);
        this.cardService.getCard(id).then((cardDTO: CardDTO) => {
            res.json(cardDTO);
        }).catch((error: Error) => {
            if (error.message === 'Card not found') {
                res.status(404).json({error: error.message});
            } else {
                res.status(500).json({error: error.message});
            }
        });
    }

   updateCard(req: Request, res: Response, next: NextFunction): void {
       const errors: Result<ValidationError> = validationResult(req);
       if (!errors.isEmpty()) {
           res.status(400).json({ errors: errors.array({onlyFirstError: true}) });
           return;
       }
       let cardDTO: CardDTO = {
          id: parseInt(req.params.id),
           titulo: req.body.titulo,
           conteudo: req.body.conteudo,
           lista: req.body.lista,
       }

       this.cardService.updateCard(cardDTO).then((responseDTO: CardDTO) => {
           cardDTO = responseDTO;
           res.status(200).send(cardDTO);
       }).catch((error: Error) => {
              if (error.message === 'Card not found') {
                res.status(404).json({error: error.message});
              } else {
                res.status(500).json({error: error.message});
              }
       });
   }

   deleteCard(req: Request, res: Response, next: NextFunction): void {
       const errors: Result<ValidationError> = validationResult(req);
       if (!errors.isEmpty()) {
           res.status(400).json({ errors: errors.array({onlyFirstError: true}) });
           return;
       }
       const id: number = parseInt(req.params.id);
       this.cardService.deleteCard(id).then(() => {
              res.status(204).send();
       }).catch((error: Error) => {
           if (error.message === 'Card not found') {
               res.status(404).json({error: error.message});
           } else {
               res.status(500).json({error: error.message});
           }
       });
   }
}
