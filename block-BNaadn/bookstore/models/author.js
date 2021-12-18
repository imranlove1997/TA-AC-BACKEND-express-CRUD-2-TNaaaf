var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var authorSchema = new Schema({
    name: { type: String, required: true},
    email: String,
    country: String
});

var Author = mongoose.model('Author', authorSchema);

module.exports = Author;