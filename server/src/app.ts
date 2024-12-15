import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app: Application = express();
const localhostURL = process.env.LOCAL_HOST as string
const port = process.env.PORT;

const corsOptions = {
    origin: [localhostURL],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use('/')

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
