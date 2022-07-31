var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const dotenv = require("dotenv");
const cameraRoute = require("./routes/camera");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const cors = require("cors");


var app = express();
dotenv.config();
const connection = mongoose.connect('mongodb+srv://FYP:fyp@cluster0.38nw6.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
connection.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/auth", authRoute);
app.use("/api/camera", cameraRoute);
app.use("/api/user", userRoute);
module.exports = app;
