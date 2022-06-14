const express = require('express'),
    userRoutes = require('./users');

var router = express.Router();


router.get('/getMovies', userRoutes.getMovies);
router.get('/getMovie/:id', userRoutes.getMovie);
router.post('/addMovie', userRoutes.CreateMovie);
router.put('/updateMovie/:id', userRoutes.updateMovie);
router.delete('/deleteMovie/:id', userRoutes.deleteMovie);
router.delete('/delete_actor/:id/:name', userRoutes.deleteActorFromMovie);
router.put('/addActor/:id/:name', userRoutes.AddActorToMovie);

module.exports = router;