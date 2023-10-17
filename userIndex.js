import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {router} from "./Route/userRoute.js";
import dotenv from "dotenv";

const app = express();
  dotenv.config();
  app.use(bodyParser.json());
  
  app.use("/api",router)

  mongoose.connect(process.env.DB_URL)
  mongoose.connection.once("connected", () => {
    console.log ("Database git Connected")
  })
git 
  app.listen(process.env.PORT, () => {
    console.log (`Server is running on: ${process.env.PORT}`)
  })
