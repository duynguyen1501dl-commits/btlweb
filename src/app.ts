// const express = require("express");
import initDatabase from "config/seed";
import webRoutes from "./routes/web";
import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.port || 3000;
// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// config static file
app.use(express.static("public"));

// config routes
webRoutes(app);

initDatabase();
app.listen(port, () => {
  console.log(`my app is running on port123: ${port}`);
  console.log("env port: ", process.env.port);
});
