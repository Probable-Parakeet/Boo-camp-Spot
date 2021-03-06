const express = require('express');
const router = express.Router();
const HauntedPlace = require('../models').HauntedPlace;
const Type = require('../models').Type;
const Review = require('../models').Review;
const passport = require('passport');
require('../config/passport');

// get all Haunted Places, with Type; no auth required
router.get('/', (req, res) => {
  HauntedPlace.findAll({
    include: [{
      model: Type
    }]
  }).then(result => {
    res.json(result);
  });
});

// get one Haunted Place, with Reviews; no auth required
router.get('/:id', (req, res) => {
  HauntedPlace.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Review
    }]
  }).then(result => {
    res.json(result);
  });
});

// create Haunted Place; auth user required
// note req.user comes from passport.authenticate(...)
router.post('/', passport.authenticate('auth-user', {session: false}), (req, res) => {
  HauntedPlace.findOne({
    where: {
      name: req.body.name
    }
  }).then(result => {
    if(result) {
      res.json({error: 'Must be unique (name already exists)!'})
    } else {
      HauntedPlace.create({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        UserId: req.user.id,
        TypeId: req.body.TypeId
      }).then(result => {
        res.json(result);
      }).catch(err => {
        if (err['errors']) { // validation error
          res.json({error: err['errors']});
        } else { // SQL error
          res.json({error: 'Invalid request.'});
        };
      });
    };
  });
});

// update Haunted Place; auth user required -> haunted place must belong to user
router.put('/:id', passport.authenticate('auth-user-has-place', {session: false}), (req, res) => {
  HauntedPlace.findOne({
    where: {
      name: req.body.name
    }
  }).then(result => {
    if(result && result.id != req.params.id) {
      res.json({error: 'Must be unique (name already exists)!'})
    } else {
      HauntedPlace.update({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        // UserId: req.user.id,
        TypeId: req.body.TypeId
      },
      {
        where: {
          id: req.params.id
        }
      }).then(result => {
        res.json(result); // 1 (successful)
      }).catch(err => {
        if (err['errors']) { // validation error
          res.json({error: err['errors']});
        } else { // SQL error
          res.json({error: 'Invalid request.'});
        };
      });
    };
  });
});

// delete Haunted Place; auth user required -> haunted place must belong to user
router.delete('/:id', passport.authenticate('auth-user-has-place', {session: false}), (req, res) => {
  HauntedPlace.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful), 0 (unsuccessful)
  });
});

module.exports = router;