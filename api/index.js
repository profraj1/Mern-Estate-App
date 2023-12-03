import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import { defaultErrorHandler } from "./utils/error.handler.js";
import bodyParser from "body-parser";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server is running at Port 3000");
});


app.use("/api/user", userRouter);
app.use("/api/auth/", authRouter);

app.use(defaultErrorHandler);