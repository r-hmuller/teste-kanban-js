import { RequestHandler } from 'express';
export const listCards:RequestHandler = (req, res, next) => {
    res.send("listCards");
};

export const createCard:RequestHandler = (req, res, next) => {
    res.send("createCard");
}

export const getCard:RequestHandler = (req, res, next) => {
    res.send("getCard");
}

export const updateCard:RequestHandler = (req, res, next) => {
    res.send("updateCard");
}

export const deleteCard:RequestHandler = (req, res, next) => {
    res.send("deleteCard");
}
