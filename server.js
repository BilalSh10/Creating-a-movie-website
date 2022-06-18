const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    cors = require('cors'),
    routers = require('./server/routes/routes.js');
const port = 3001;
const app=express();
const mongoose = require('mongoose');

app.use('/list', express.static(path.join(__dirname, 'client/html/index.html')));
app.use('/add_movie', express.static(path.join(__dirname, 'client/html/add_new_movie.html')));
app.use('/add_actor/:id', express.static(path.join(__dirname, 'client/html/add_actor_form.html')));
app.use('/view_actor/:id', express.static(path.join(__dirname, 'client/html/view_actor.html')));
app.use('/edit_movie/:id', express.static(path.join(__dirname, 'client/html/edit_movie.html')));
app.use('/js', express.static(path.join(__dirname, 'client/js')));
app.use('/css', express.static(path.join(__dirname, 'client/css')));


//restfull 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routers);


mongoose.connect('mongodb+srv://bilal:bilal@cluster0.b36f5.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log("connected to DB");
});


const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});