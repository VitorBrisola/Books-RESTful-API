var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var app = express();

Genre = require('./models/genres');
Book  = require('./models/books');

//Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true });
var db = mongoose.connection;

// Initial route
app.get('/', function(req, res){
    res.send('Please use /api/books or /api/genres');
});

// Genres route
app.get('/api/genres', function(req,res){
    Genre.getGenres(function(err,genres){
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

// Books route
app.get('/api/books',function(req,res){
    Book.getBooks(function(err,books){
        if(err){
            throw err;
        }
        res.json(books);
    });
});

// Single Book route
app.get('/api/books/:_id',function(req,res){
    Book.getBooksById(req.params._id,function(err,books){
        if(err){
            throw err;
        }
        res.json(books);
    });
});

app.listen(3000); // connection port where browser should listen from
console.log('Running on port 3000...');