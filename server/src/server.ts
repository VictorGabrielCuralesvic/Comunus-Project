import express from "express";
import { router } from "./routes";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log("Server running on port: " + port);
});