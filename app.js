var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var itemRouter = require('./routes/item');
var reservationRouter = require('./routes/reservation');
var studentRouter = require('./routes/student');
let mongoose = require('mongoose');

var app = express();
bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/item', itemRouter);
app.use('/reservation', reservationRouter);
app.use('/student', studentRouter);

app.set('view engine', 'html');

mongoose.connect("mongodb+srv://vocab:" + process.env.MONGO_ATLAS_PW + "@cluster0-odrxs.mongodb.net/test",
    {
        useNewUrlParser: true
    }
).catch(err=>{
    console.log(err);
});

mongoose.set('useCreateIndex', true)

module.exports = app;
