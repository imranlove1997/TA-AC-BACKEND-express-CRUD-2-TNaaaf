var express = require('express');
var router = express.Router();

var Book = require('../models/book');
var Author = require('../models/author');
var Category = require('../models/category');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Book.find({}).populate('author').exec((err, books) => {
    if(err) return next(err);
    res.render('bookDetails', {books});
  })
});

router.get('/new', (req, res, next) => {
  Author.find({}, (err, authors) => {
    if(err) return next(err);
    Category.find({}, (err, categories) => {
      if(err) return next(err);
      res.render('bookForm', {authors: authors, categories: categories});
    });
  });
});

router.post('/', (req, res, next) => {
  Book.create(req.body, (err, book) => {
    if(err) return next(err);
    res.redirect('/books');
  });
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Book.findById(id).populate('author').populate('category').exec((err, book) => {
    if(err) return next(err);
    res.render('bookContent', {book});
  })
})

module.exports = router;
