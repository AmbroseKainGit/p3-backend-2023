import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
  console.log(`Restaurant API listening on: ${SERVER_PORT}`);
});