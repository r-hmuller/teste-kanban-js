import express, { Express, Request, Response } from 'express';
import card from "./src/route/card";

const app: Express = express();
const port: string = '3000'

app.use(express.json());
app.use('/cards', card);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
