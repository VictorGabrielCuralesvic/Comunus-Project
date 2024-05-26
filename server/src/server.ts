import express from "express";
import { router } from "./routes/routes";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log("Server running on port: " + port);
});