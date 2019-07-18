var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    author:{
        type: String
    },
    description:{
        type: String
    },
    genre:{
        type: String,
        require: true
    }
});

var Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = function(callback,limit){
    Book.find(callback).limit(limit);
};

// Get Book
module.exports.getBooksById = function(id,callback){
    Book.findById(id,callback);
};

// Add Book
module.exports.addBook = function(book,callback){
    Book.create(book,callback);
};
