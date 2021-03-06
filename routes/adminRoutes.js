const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Type = require('../models').Type;
const HauntedPlace = require('../models').HauntedPlace;
const Review = require('../models').Review;

//==== Users
// get all Users
router.get('/users', (req, res) => {
  User.findAll({}).then(result => {
    res.json(result);
  });
});


// update User
router.put('/users/:id', (req, res) => {
  User.update({
    admin: req.body.admin 
  },
  {
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful)
  }).catch(err => {
    res.json(err);
  });;
});

// delete User
router.delete('/users/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful), 0 (unsuccessful)
  });
});

//===== Type
// get all type
router.get('/types', (req, res) => {
  Type.findAll({}).then(result => {
    res.json(result);
  });
});

// create type
router.post('/types', (req, res) => {
  Type.create({
    name: req.body.name,
  }).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
});

// update type
router.put('/types/:id', (req, res) => {
  Type.update({
    name: req.body.name,
  },
  {
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful)
  }).catch(err => {
    res.json(err);
  });;
});

// delete type
router.delete('/types/:id', (req, res) => {
  Type.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful), 0 (unsuccessful)
  });
});

//===== HauntedPlaces
// get all haunted places
router.get('/hauntedplaces', (req, res) => {
  HauntedPlace.findAll({}).then(result => {
    res.json(result);
  });
});

// delete haunted place
router.delete('/hauntedplaces/:id', (req, res) => {
  HauntedPlace.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful), 0 (unsuccessful)
  });
});

//===== Reviews
// get all reviews
router.get('/reviews', (req, res) => {
  Review.findAll({}).then(result => {
    res.json(result);
  });
});

// delete review
router.delete('/reviews/:id', (req, res) => {
  Review.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful), 0 (unsuccessful)
  });
});

module.exports = router;