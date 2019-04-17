const router = require('express').Router()
const chance = require('chance').Chance()
// Player model
// const Player = require('../../models/Player')
const PlayerAttribut = require('../../models/PlayerAttribut')

// @Route  GET api/players
// @desc   Get all players
// access  Public
router.get('/', (req, res) => {
  PlayerAttribut.find()
    .then(players => res.json(players))
})

// @Route  POST api/players
// @desc   Create a player
// access  Public

// router.post('/', (req, res) => {
//   const firstName = chance.first({ gender: 'male' })
//   const lastName = chance.last()
//   const birthday = chance.birthday({ year: chance.year({ min: 1979, max: 2004 }) })
//   const country = chance.country({ full: true })
//   // const value = chance.integer({ min: 1, max: 20 })

//   const newPlayer = new PlayerAttribut({
//     firstname: firstName,
//     lastname: lastName,
//     age: new Date().getFullYear() - birthday.toString().substring(11, 15),
//     birthday: birthday,
//     country: country,
//     egenskaper: {
//       tecnival: {
//         speed: 300,
//         agility: 234
//       },
//       behaviour: {
//         courage: 12
//       }
//     }
//   })

//   newPlayer.save().then(player => res.json(player))
// })

// Exports
module.exports = router
