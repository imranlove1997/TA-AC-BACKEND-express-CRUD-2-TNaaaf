var express = require('express');
var router = express.Router();
var Category = require('../models/category');

router.get('/', (req, res, next) => {
    Category.find({}, (err, categories) => {
        res.render('category', {categories});
    });
});

router.get('/new', (req, res) => {
    res.render('categoryForm');
});

router.post('/', (req, res, next) => {
    Category.create(req.body, (err , categor) => {
        if(err) return next(err);
        res.redirect('/categories');
    });
});

module.exports = router;