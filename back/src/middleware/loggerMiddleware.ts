import {NextFunction, Request, Response} from "express";
import {CardService} from "../service/card";
import dayjs from 'dayjs';

const cardService = new CardService();

exports.updateLogger = (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    const titulo: string = req.body.titulo;

    const date = dayjs().format('DD/MM/YYYY HH:mm:ss');
    console.log(`${ date } - Card ${ id } - ${ titulo } - Atualizado`);
    next();
}

exports.deleteLogger = (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id);
    cardService.getCard(id).then((card) => {
        const date = dayjs().format('DD/MM/YYYY HH:mm:ss');
        console.log(`${ date } - Card ${ card.id } - ${ card.titulo } - Removido`);
        next();
    });

}
