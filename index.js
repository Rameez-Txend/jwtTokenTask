import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import authRoute from "./routes/authRoute.js";

import "./config/dbConn.js";

const app = express();

// mongoose
//   .connect("mongodb://127.0.0.1:27017/user-roles-perm")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

app.use(express.json());

app.use("/api", authRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
