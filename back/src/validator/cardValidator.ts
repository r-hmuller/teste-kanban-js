import {query} from "express-validator";

import {body} from 'express-validator';

exports.validate = (method: string) => {
    switch (method) {
        case 'createCard': {
            return [
                body('titulo', 'titulo does not exists').exists().isString().trim(),
                body('conteudo', 'conteudo does not exists').exists().isString().trim(),
                body('lista').exists().isString().trim().isIn(['TODO', 'DOING', 'DONE']),
            ];
        }
        case 'updateCard': {
            return [
                body('titulo', 'titulo does not exists').exists().isString().trim(),
                body('conteudo', 'conteudo does not exists').exists().isString().trim(),
                body('lista').exists().isString().trim().isIn(['TODO', 'DOING', 'DONE']),
                query('id').exists().isUUID(4),
            ];
        }
        case 'deleteCard':
        case 'getCard': {
            return [
                query('id').exists().isUUID(4),
            ];
        }
    }
}
