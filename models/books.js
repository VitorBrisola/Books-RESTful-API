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

// Update Book
module.exports.updateBook = function(id,book,options,callback){
    var query = { _id: id };    
    var update = {
        title: book.title,
        author: book.author,
        description: book.description,
        genre: book.genre
    }
    Book.findOneAndUpdate(query,update,options,callback);
}

// delete Book
module.exports.deleteBook = function(id,callback){
    var query = { _id: id };    
    Book.remove(query,callback);
}