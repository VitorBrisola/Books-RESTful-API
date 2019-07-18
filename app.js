var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var app = express();



Genre = require('./models/genres');
Book  = require('./models/books');

app.use(bodyParser.json());

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

app.post('/api/genres', function(req,res){
    var genre = req.body;
    Genre.addGenre(genre,function(err,genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

app.put('/api/genres/:_id', function(req,res){
    var id = req.params._id;
    var genre = req.body;
    var options = {};
    Genre.updateGenre(id,genre,options,function(err,genre){
        if(err){
            throw err;
        }
        res.json(genre);
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

app.post('/api/books', function(req,res){
    var book = req.body;
    Book.addBook(book,function(err,book){
        if(err){
            throw err;
        }
        res.json(book);
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