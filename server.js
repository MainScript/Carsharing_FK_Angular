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

var bookingSchema = new mongo.Schema({
    customer_id: String,
    car_id: String,
    date: String,
    from_time: String,
    to_time: String,
    price: Number,
});

var Car = mongo.model('Car', carSchema, 'cars');
var Customer = mongo.model('Customer', customerSchema, 'customers');
var Booking = mongo.model('Booking', bookingSchema, 'bookings');

app.get('/api/cars', function(req, res) {
    Car.find(function(err, cars) {
        if(err) {
            res.json({error: err});
        } else {
            res.json(cars);
        }
    });
});

app.get('/api/carsByIds', function(req, res) {
    var ids = JSON.parse(req.query.ids);
    if(ids.every(function(id) {
        return /^[0-9a-fA-F]{24}$/.test(id);
    })) {
        Car.find({_id: {$in: ids}}, function(err, cars) {
            if(err) {
                res.json({error: err});
            } else {
                res.json(cars);
            }
        });
    } else {
        res.json({error: 'Invalid id'});
    }
});

app.get('/api/test', function(req, res) {
    res.send('Hello World!');
});

app.get('/api/customer', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    Customer.findOne({username: username, password: password}, function(err, customer) {
        if(err) {
            res.json({error: err});
        } else {
            if (customer) {
                res.json(customer);
            } else {
                res.json({error: 'No customer found'});
            }
        }
    });
});

app.get('/api/customers', function(req, res) {
    Customer.find(function(err, customers) {
        if(err) {
            res.json({error: err});
        } else {
            res.json(customers);
        }
    });
});

app.post('/api/customer', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    Customer.findOne({username: username}, function(err, customer) {
        if(err) {
            res.json({error: err});
        } else if(customer) {
            res.json({error: 'Customer already exists'});
        } else {
            var newCustomer = new Customer({
                username: username,
                password: password
            });
            newCustomer.save(function(err, customer) {
                if(err) {
                    res.json({error: err});
                } else {
                    res.json(customer);
                }
            });
        }
    });    
});

app.post('/api/booking', function(req, res) {
    var booking = req.body;
    var newBooking = new Booking(booking);

    newBooking.save(function(err, booking) {
        if(err) {
            res.json({error: err});
        } else {
            res.json(booking);
        }
    });
});

app.get('/api/bookings', function(req, res) {
    Booking.find(function(err, bookings) {
        if(err) {
            res.json({error: err});
        } else {
            res.json(bookings);
        }
    });
});

app.get('/api/bookingsCustomer/:customer_id', function(req, res) {
    var customer_id = req.params.customer_id;
    Booking.find({customer_id: customer_id}, function(err, bookings) {
        if(err) {
            res.json({error: err});
        } else {
            res.json(bookings);
        }
    });
});

app.get('/api/bookingsCar/:car_id', function(req, res) {
    var car_id = req.params.car_id;
    Booking.find({car_id: car_id}, function(err, bookings) {
        if(err) {
            res.json({error: err});
        } else {
            res.json(bookings);
        }
    });
});


app.listen(3000, function() {
    console.log('Server running on port 3000');
});