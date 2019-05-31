const { describe, it } = require('mocha')
const request = require('supertest')
const { expect } = require('chai')
const { saltAndHash, sign } = require('../config/helper/jwt')

const backend = request.agent('http://localhost:5000')

// id to pass into delete test.
let _id = ''

describe('Registrering', () => {
  describe('1.1 Testfall M.1 Registrering', () => {
    it('Should respond with object user with name, email, teamName, description, favTeam, favPlayer', (done) => {
      backend
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
          if (err) console.log('signup1:', err)
          _id = res.body.user._id
          delete res.body.token
          delete res.body.user._id
          expect(res.body).to.be.an('object').that.deep.include(
            { 'user':
            { 'name': 'TEST',
              'email': 'TEST@gmail.com',
              'teamName': 'TEST IF',
              'description': 'Edit profile to change description',
              'favTeam': '',
              'favPlayer': '',
              'totalPoints': 10,
              'lastPlayed': 0 } })
        })
      done()
    })

    it('Should respond with message "msg: Please enter all fields", if fields are empty', (done) => {
      backend
        .post('/api/signup')
        .expect(400)
        .send({
          email: 'skutt@gmail.com',
          password: '',
          teamName: 'Skutt IF'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) console.log('signup2:', err)
          expect(res.res.text).to.equal(`{"msg":"Please enter all fields"}`)
        })
      done()
    })

    it('Should respond with message "msg: User already exist", if user exist in database', (done) => {
      backend
        .post('/api/signup')
        .send({
          name: 'TEST',
          email: 'ronaldo@gmail.com',
          password: '12345678',
          teamName: 'Skutt IF'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) console.log('signup3:', err)
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

    it('Should remove user', (done) => {
      backend
        .post('/api/delete')
        .send({ id: _id })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) console.log('error on removing:', err)
          expect(res.text).to.equal('{"Success":true}')
        })
      done()
    })
  })
})
