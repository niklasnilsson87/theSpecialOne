const { describe, it } = require('mocha')
const request = require('supertest')
const { expect } = require('chai')
const { saltAndHash, sign } = require('../config/helper/jwt')

// const server = request.agent('http://localhost:3000')
const backend = request.agent('http://localhost:5000')

describe('1.1 Testfall M.1 Registrering', () => {
  it('Should response with 200', (done) => {
    backend
      .post('/api/signup')
      .send({
        name: 'Skutt',
        email: 'skutt@gmail.com',
        password: 'skuttis',
        teamName: 'Skutt IF'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.status).to.equal(200)
      })
    done()
  })
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
        if (err) console.log('signup:', err)
        delete res.body.token
        delete res.body.user._id
        expect(res.body).to.be.an('object').that.deep.include(
          { 'user':
            { 'name': 'TEST',
              'email': 'TEST@gmail.com',
              'teamName': 'TEST IF',
              'description': 'no description',
              'favTeam': 'N/A',
              'favPlayer': 'N/A' } })
      })
    done()
  })

  it('Should respond with message "msg: Please enter all fields", if fields are empty', (done) => {
    backend
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
    backend
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
        // console.log(res)
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
