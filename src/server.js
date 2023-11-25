import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require('dotenv').config();

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
viewEngine(app);
initWebRoutes(app);
connectDB();
const port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
