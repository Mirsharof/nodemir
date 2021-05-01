const express = require('express');
const router = express.Router();

const Music = require('../model/Music')


router.post('/', function (req, res, next) {

  const music = new Music(req.body);

  const promise = music.save()

  promise.then(data => {
    res.json(data)
  }).catch(err => {
    console.log(err);
  })

});

//List all movies

router.get('/', function (req, res, next) {
  const promise = Music.find({});
  promise.then(music => {
    res.json(music)
  }).catch(err => {
    console.log(err);
  })
});


// Get id orqali qabul qilish



router.get('/:music_id', function (req, res, next) {
  const promise = Music.findById(req.params.music_id);
  promise.then(music => {
    res.json(music)
  }).catch(err => {
    console.log(err);
  })
});


// Put orqali malumotni yangilash


router.put('/:music_id', function (req, res, next) {
  const promise = Music.findByIdAndUpdate(req.params.music_id, req.body);
  promise.then(music => {
    res.json(music)
  }).catch(err => {
    console.log(err);
  })
});


// Delete orqali malumotni uchirish


router.delete('/:music_id', function (req, res, next) {
  const promise = Music.findByIdAndDelete(req.params.music_id);
  promise.then(music => {
    res.json(music)
  }).catch(err => {
    console.log(err);
  })
});


// Get  orqali top 10 ta malumotni qabul qilish


router.get('/top/top10', function (req, res, next) {
  const promise = Music.find({}).limit(10).sort({ imdb_score: -1 });
  promise.then(music => {
    res.json(music)
  }).catch(err => {
    console.log(err);
  })
});

// Get :start_year/:end_year

router.get('/betwen/:start_year/:end_year', (req, res, next) => {
  const { start_year, end_year } = req.params

  // Gte = great then equal >= katta yoki teng 
  // Lte = little then equal <= kichkina yoki teng

  const promise = Music.find({
    year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
  })

  promise.then(music => {
    res.json(music)
  }).catch(err => {
    console.log(err);
  })
});


module.exports = router;
