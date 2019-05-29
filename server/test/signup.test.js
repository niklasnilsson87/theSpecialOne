const { describe, it, after, before } = require('mocha')
const request = require('supertest')
const { expect } = require('chai')
const { saltAndHash, sign } = require('../config/helper/jwt')
// const User = require('../models/User')
const app = require('../server')
const mongoose = require('../config/mongoose')

// const backend = request.agent(app)

// async function deleteId (id) {
//   console.log('email', id)
//   let test = await User.deleteOne({ id })
//   console.log(test)
// }

describe('Registrering', () => {
  // let id
  let server

  before((done) => {
    server = app.listen(3001)
    mongoose.connect()
      .then(() => done())
      .catch((err) => done(err))
  })

  after((done) => {
    // deleteId(id)
    server.close()
    console.log('removed')
    done()
  })
  describe('1.1 Testfall M.1 Registrering', () => {
    //   it('Should response with 200', (done) => {
    //     let Mockuser = {
    //       name: 'Skutt',
    //       email: 'skutt@gmail.com',
    //       password: 'skuttis',
    //       teamName: 'Skutt IF'
    //     }

    //     backend
    //       .post('/api/signup')
    //       .send(Mockuser)
    //       .set('Accept', 'application/json')
    //       .end((err, res) => {
    //         id = res.body.user._id
    //         if (err) console.log(err)
    //         expect(res.status).to.equal(200)
    //       })
    //     done()
    //   })

    it('Should respond with object user with name, email, teamName, description, favTeam, favPlayer', (done) => {
      request(app)
        .post('/api/signup')
        .expect(200)
        .send({
          name: 'TEST',
          email: 'TEST@gmail.com',
          password: 'TEST',
          teamName: 'TEST IF'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) console.log('signup:', err)
          // id = res.body.user._id
          delete res.body.token
          delete res.body.user._id
          expect(res.body).to.be.an('object').that.deep.include(
            { 'user':
            { 'name': 'TEST',
              'email': 'TEST@gmail.com',
              'teamName': 'TEST IF',
              'description': 'Change description below',
              'favTeam': '',
              'favPlayer': '',
              'totalPoints': 10,
              'lastPlayed': 0 } })
        })
      done()
    })

    it('Should respond with message "msg: Please enter all fields", if fields are empty', (done) => {
      request(app)
        .post('/api/signup')
        .expect(400)
        .send({
          name: null,
          email: 'skutt@gmail.com',
          password: null,
          teamName: 'Skutt IF'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) console.log('signup:', err)
          expect(res.res.text).to.equal(`{"msg":"Please enter all fields"}`)
        })
      done()
    })

    it('Should respond with message "msg: User already exist", if user exist in database', (done) => {
      request(app)
        .post('/api/signup')
        .expect(400)
        .send({
          name: 'Kalle Karlsson',
          email: 'kalle@gmail.com',
          password: '1234',
          teamName: 'Skutt IF'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) console.log('signup:', err)
          expect(res.res.text).to.equal(`{"msg":"User already exist"}`)
        })
      done()
    })

    it('Should hash password "test" to not equal "test"', () => {
      const user = {
        name: 'Niklas',
        password: 'test'
      }
      saltAndHash(user)
        .then(x => {
          expect(x.password).to.not.equal('test')
        })
    })

    it('Should recive token as a string', () => {
      const user = {
        name: 'Niklas',
        password: 'test'
      }
      sign(user)
        .then(token => {
          expect(token).to.be.a('string')
        })
    })
  })
})
