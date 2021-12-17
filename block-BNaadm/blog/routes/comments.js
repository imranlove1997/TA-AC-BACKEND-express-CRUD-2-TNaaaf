var express = require('express');

var router = express.Router();

var Comment = require('../models/comment');

router.get('/:id/edit', (req, res, next) => {
    var id = req.params.id;
    Comment.findById(id, (err, comment) => {
        if(err) return next(err);
        res.render('commentUpdate', {comment});
    });
});

router.post('/:id', (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id, req.body, (err, updatedComment) => {
        if(err) return next(err);
        res.redirect('/articles/' + updatedComment.articleId);
    });
});

router.get('/:id/delete', (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndDelete(id, (err, comment) => {
        if(err) return next(err);
        res.redirect('/articles/' + comment.articleId);
    });
});

router.get('/:id/likes', (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err, like) => {
        if(err) return next(err);
        res.redirect('/articles/' + like.articleId);
    });
});

router.get('/:id/dislikes', (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id, {$inc: {dislikes: 1}}, (err, dislike) => {
        if(err) return next(err);
        res.redirect('/articles/' + dislike.articleId);
    });
});

module.exports = router;