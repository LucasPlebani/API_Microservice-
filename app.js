const express = require("express");
const userRoutes = require("./src/routes/user");

app.use("/api/auth", userRoutes);

const express = require('express');

const app = express();
const db = mongoClient.db("ExpressLucas");
app.locals.db = db;


module.exports = app;