import {RequestHandler} from "express";

export const login:RequestHandler = (req, res, next) => {
    res.send("createCard");
}
