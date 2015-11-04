var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

router.post('/', function(req, res) {
	var path = req.body;
	db.favorite.findOrCreate({
		where: {
			imdbId: path.imdbId,
			year: path.year,
			title: path.title
		}
	}).spread(function(favorite, created) {
		console.log(favorite.get());
		res.redirect('/favorite');
	});

});

router.get('/', function(req, res) {
	db.favorite.findAll({
		order: 'title ASC'
	}).then(function(favorites) {
		res.render('favorite/index', {favorite: favorites});
	});
});


// router.get('/:id/tags', function(req, res) {
// 	res.render('favorite/tags', {id:req.params.id});
// });

// router.post('/:imdbId/tags', function(req, res) {
// 	var id = req.params.imdbId;
// 	db.favorite.find({
// 		where: {imdbId: id}
// 	}).then(function(favorites) {
// 		db.tag.findOrCreate({
// 			where: {name: req.body.tags}

// 		}).spread(function(tag, created) {
// 			favorites.addTag(tag).then(function (){
// 			res.redirect('/tags')

// 			});
// 		});
// 	});
// });

// router.get('/:id/comment', function(req, res) {
// 	var id = req.params.id;
// 	db.favorite.findById(id).then(function(favorites) {
// 		db.post.findAll({
// 			where: {favoriteId: req.params.id}
// 		}).then(function(comment){
// 			res.render('comment', {comment: comment, favorite: favorites});
// 		});
// 	});

// });

// router.post('/:id/comment', function (req, res) {
// 	db.post.create({
// 		favoriteId: req.params.id,
// 		title: req.body.title,
// 		content: req.body.content
// 	}).then(function(comment){
// 		res.redirect('/favorite/' + req.params.id + "/comment")
// 	});
// });

// router.delete('/:imdbID', function(req, res) {
//   db.favorite.destroy({
//     where: {
//       imdbID: req.params.imdbID
//     }
//   }).then(function() {
//     res.send({'msg': 'success'});
//   }).catch(function(e) {
//     res.send({'msg': 'error', 'error': e});

//   });
// });

module.exports = router;

// Modify favorites page

// Add a "comments" button next to each item in the list
// The comments button should link to a new page


// Comments page

// Lists all comments for a specific post
// Should list comments based on a URL parameter (favorite item id)
// Have a form to add a comment associated to that favorite item
// Recommended route: /favorites/:id/comments

// Comments model
// attributes (columns):
// comment text
// comment author
// id to reference favorite item
// associate to favorite items
// favorite item HAS MANY comments
// comment BELONGS TO one favorite item