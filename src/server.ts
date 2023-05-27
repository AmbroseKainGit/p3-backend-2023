import express from "express";
import dotenv from "dotenv";
import { defaultErrorHandler } from "./Utils/handler";
import { categoryRouter } from "./Routes/category";
dotenv.config();
const app = express();
const { SERVER_PORT } = process.env;

app.use(defaultErrorHandler);
app.use('/categories', categoryRouter);
app.listen(SERVER_PORT, () => {
  console.log(`Restaurant API listening on: ${SERVER_PORT}`);
});