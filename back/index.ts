import express, {Express, NextFunction, Request, Response} from 'express';
import cors from 'cors';

import card from "./src/route/card";
import auth from "./src/route/auth";

const app: Express = express();
const port: string = '3000'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:4200',
}));

app.use('/cards', card);
app.use('/login', auth);

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    res.status(err.status || 500);
    res.send(err || {message: "Internal Server Error"});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
