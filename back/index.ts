import express, {Express, NextFunction, Request, Response} from 'express';
import card from "./src/route/card";

const app: Express = express();
const port: string = '3000'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cards', card);

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    res.status(err.status || 500);
    res.send(err || {message: "Internal Server Error"});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
