import {RequestHandler} from "express";
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const login:RequestHandler = (req, res, next) => {
    const {login, password} = req.body;
    const tokenSecret = process.env.TOKEN_SECRET;
    if (!tokenSecret) {
        res.status(500).json({message: "Internal Server Error"});
        return;
    }
    if (login === process.env.AUTH_USERNAME && password === process.env.AUTH_PASSWORD) {
        const jwtToken = jwt.sign({"login": login}, tokenSecret, { expiresIn: 60 * 60 });
        res.json({jwtToken});
        return;
    }

    res.status(401).json({message: "Invalid login or password"});
}
