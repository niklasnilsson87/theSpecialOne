const router = require('express').Router()
const chance = require('chance').Chance()
const { player } = require('../playerSchema')
// Player model
const Player = require('../../models/Player')

// @Route  GET api/players
// @desc   Get all players
// access  Public
router.get('/', (req, res) => {
  Player.find()
    .then(players => res.json(players))
})

// @Route  POST api/players
// @desc   Create a player
// access  Public

router.post('/', (req, res) => {
  // const birthday = chance.birthday({ year: chance.year({ min: 1979, max: 2004 }) })

  player('niklas').then(player => res.json(player))

  // const newPlayer = new Player({
  //   owner: 'Niklas',
  //   firstname: chance.first({ gender: 'male' }),
  //   lastname: chance.last(),
  //   age: new Date().getFullYear() - birthday.toString().substring(11, 15),
  //   birthday: birthday,
  //   country: chance.country({ full: true }),
  //   attributes: {
  //     tecnical: {
  //       finishing: chance.integer({ min: 1, max: 20 }),
  //       dribbling: chance.integer({ min: 1, max: 20 }),
  //       heading: chance.integer({ min: 1, max: 20 }),
  //       marking: chance.integer({ min: 1, max: 20 }),
  //       passing: chance.integer({ min: 1, max: 20 }),
  //       crossing: chance.integer({ min: 1, max: 20 })
  //     },
  //     mental: {
  //       aggression: chance.integer({ min: 1, max: 20 }),
  //       bravery: chance.integer({ min: 1, max: 20 }),
  //       composure: chance.integer({ min: 1, max: 20 }),
  //       concentration: chance.integer({ min: 1, max: 20 }),
  //       leadership: chance.integer({ min: 1, max: 20 }),
  //       positioning: chance.integer({ min: 1, max: 20 }),
  //       teamWork: chance.integer({ min: 1, max: 20 }),
  //       workRate: chance.integer({ min: 1, max: 20 })
  //     },
  //     physical: {
  //       speed: chance.integer({ min: 1, max: 20 }),
  //       balance: chance.integer({ min: 1, max: 20 }),
  //       jumping: chance.integer({ min: 1, max: 20 }),
  //       stamina: chance.integer({ min: 1, max: 20 }),
  //       strength: chance.integer({ min: 1, max: 20 })
  //     }
  //   }
  // })

  // newPlayer.save().then(player => res.json(player))
})

// Exports
module.exports = router
