var express = require('express');
const Director = require('../model/Director');
var router = express.Router();



router.post('/', (req, res, next) => {
  const director = new Director(req.body);

  const promise = director.save();

  promise.then(data => res.json(data))
  .catch(err => console.log(err));

});

/* GET director by iD. ccc */ 

// router.get('/:director_id', (req, res, next) => {
//     const promise = Director.findById(req.params.director_id)

//     promise.then(data => res.json(data))
//     .catch(err => console.log(err));
// });


/* lookup aggregate. schemalarni bir biriga ulash */

router.get('/:director_id', (req, res, next) => {

    const promise = Director.aggregate([
        {
            $lookup : {
                from: 'musics',
                localField: '_id',
                foreignField: 'director_id',
                as: 'musicss'
            }
        },
        {
          $unwind: {
            path: "$musicss"
          }
        },
        {
          $group: {
            _id: {
              _id: '$_id',
              name: "$name",
              surname: "$surname",
              bio: "$bio",
            },
            musicss: {
              $push: "$musicss"
            }

          },
        } ,
        {
            $project: {
              _id: '$_id._id',
              name: '$_id.name',
              surname: '$_id.surname',
              musicss: 'musicss'
            }
          }
    ])

    promise.then(data => res.json(data))
    .catch(err => console.log(err));
});


  

module.exports = router;
