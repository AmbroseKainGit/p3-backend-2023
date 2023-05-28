import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { defaultErrorHandler } from "./Utils/handler.js";
import { categoryRouter } from "./Routes/category.js";
import { productRouter } from "./Routes/product.js";

dotenv.config();
const app = express();
const { SERVER_PORT } = process.env;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(defaultErrorHandler);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.listen(SERVER_PORT, () => {
  console.log(`Restaurant API listening on: ${SERVER_PORT}`);
});