import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from './Config/dbConnect';
import userRoute from "./routes/userRoute"
dotenv.config();

const app: Application = express();
const localhostURL = process.env.LOCAL_HOST as string
const port = process.env.PORT;

dbConnection()

const corsOptions = {
    origin: [localhostURL],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoute)

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
