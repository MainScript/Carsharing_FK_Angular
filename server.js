var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var db = mongo.connect('mongodb://localhost:27017/carsharing_db', function(err, resp) {
    if(err) {
        console.log('Error connecting to MongoDB');
    } else {
        console.log(`Connected to ${db}`);
    }
});

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var carSchema = new mongo.Schema({
    make: String,
    model: String,
    year: Number,
    fuel: String,
    price: Number,
    ppm: Number,
    max_duration: Number,
    from_time: String,
    to_time: String
});
    
var customerSchema = new mongo.Schema({
    username: String,
    password: String,
});

var Car = mongo.model('Car', carSchema, 'cars');
var Customer = mongo.model('Customer', customerSchema, 'customers');

app.get('/api/cars', function(req, res) {
    // get all cars
    Car.find(function(err, cars) {
        if(err) {
            res.send(err);
        } else {
            res.json(cars);
        }
    });
});

app.get('/api/test', function(req, res) {
    res.send('Hello World!');
});

app.get('/api/customer', function(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    Customer.findOne({username: username, password: password}, function(err, customer) {
        if(err) {
            res.send(err);
        } else {
            res.json(customer);
        }
    });
});

app.post('/api/customer', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var customer = new Customer({
        username: username,
        password: password
    });
    customer.save(function(err) {
        if(err) {
            res.send(err);
        } else {
            res.json({message: 'Customer created!'});
        }
    });
});

app.listen(3000, function() {
    console.log('Server running on port 3000');
});